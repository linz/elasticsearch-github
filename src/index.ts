import { Client } from '@elastic/elasticsearch';
import { WebhookEvent } from '@octokit/webhooks-types';
import type { APIGatewayEvent, APIGatewayProxyCallback, APIGatewayProxyResult } from 'aws-lambda';
import { createHmac } from 'crypto';
import pino from 'pino';
import * as ulid from 'ulid';
import { cleanHook } from './clean';
import { indexName } from './hook';
import { HookActions } from './hooks';

const logger = pino();

const HmacSecret = process.env.GITHUB_WEBHOOK_SECRET;
const ElasticCredentials = {
  username: process.env.ELASTIC_CLOUD_USERNAME ?? '',
  password: process.env.ELASTIC_CLOUD_PASSWORD ?? '',
  id: process.env.ELASTIC_CLOUD_ID ?? '',
};

if (ElasticCredentials.id === '') throw new Error('Missing $ELASTIC_CLOUD_ID');
if (ElasticCredentials.password === '') throw new Error('Missing $ELASTIC_CLOUD_PASSWORD');
if (ElasticCredentials.username === '') throw new Error('Missing $ELASTIC_CLOUD_USERNAME');

export const client = new Client({ cloud: ElasticCredentials });

class LambdaResponse {
  status: number;
  req: LambdaRequest;
  body: string;

  constructor(req: LambdaRequest, status: number, body: string) {
    this.req = req;
    this.body = body;
    this.status = status;
  }

  toJson(): APIGatewayProxyResult {
    return {
      statusCode: this.status,
      headers: {
        'Content-Type': 'application/json',
        'X-LINZ-Request-Id': this.req.id,
      },
      body: JSON.stringify({ id: this.req.id, message: this.body }),
    };
  }
}

class LambdaRequest {
  id: string;
  event: APIGatewayEvent;

  constructor(event: APIGatewayEvent) {
    this.id = ulid.ulid();
    this.event = event;
  }

  validateHmac(): void {
    if (HmacSecret == null) throw new LambdaResponse(this, 500, 'Invalid $GITHUB_WEBHOOK_SECRET');
    if (this.event.body == null) throw new LambdaResponse(this, 500, 'Invalid request no body');
    const hmac = `sha256=${createHmac('sha256', HmacSecret).update(this.event.body).digest('hex')}`;
    if (this.event.headers['X-Hub-Signature-256'] !== hmac) {
      throw new LambdaResponse(this, 400, 'Invalid X-Hub-Signature');
    }
  }

  parseBody(): WebhookEvent {
    const contentType = this.event.headers['content-type'];
    if (contentType !== 'application/json') {
      throw new LambdaResponse(this, 400, `Invalid content-type: "${contentType}"`);
    }

    try {
      return JSON.parse(this.event.body ?? '');
    } catch (e) {
      throw new LambdaResponse(this, 400, 'Invalid body');
    }
  }

  async process(): Promise<LambdaResponse> {
    this.validateHmac();

    const hook = this.parseBody();
    const hookType = this.event.headers['X-GitHub-Event'] ?? 'unknown';
    const hookId = this.event.headers['X-GitHub-Delivery'] ?? this.id;

    for (const action of HookActions) {
      if (!action.is(hookType, hook)) continue;
      const res = action.process(hook);
      if (res == null) return new LambdaResponse(this, 200, 'skipped');
      logger.info({ name: action.name }, 'Hook');

      const cleaned = cleanHook(res.hook);

      cleaned['@timestamp'] = res.timestamp;
      cleaned['@type'] = action.name;

      const index = indexName(res.prefix, res.timestamp);
      await client.index({ index: index, body: res.hook, id: hookId });
      return new LambdaResponse(this, 200, 'ok');
    }

    logger.error(
      {
        id: this.id,
        hookType,
        hookId,
        matches: HookActions.map((c) => {
          return { name: c.name, is: c.is(hookType, hook) };
        }),
      },
      'Failed to find matching hook action',
    );
    return new LambdaResponse(this, 400, 'Failed to process');
  }
}

export async function handler(event: APIGatewayEvent, _ctx: unknown, callback: APIGatewayProxyCallback): Promise<void> {
  const req = new LambdaRequest(event);

  let res: LambdaResponse;
  try {
    res = await req.process();
  } catch (e) {
    if (e instanceof LambdaResponse) {
      res = e;
    } else {
      res = new LambdaResponse(req, 500, e.message);
    }
  }

  if (res.status >= 400) logger.error({ id: req.id, status: res.status }, res.body);
  else logger.info({ id: req.id, status: res.status }, res.body);
  callback(null, res.toJson());
}
