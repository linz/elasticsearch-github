import { Client } from '@elastic/elasticsearch';
import { LambdaFunction, LambdaHttpRequest, LambdaHttpResponse } from '@linzjs/lambda';
import { createHmac } from 'crypto';
import { cleanHook } from './clean';
import { indexName } from './hook';
import { HookActions } from './hooks';

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

export const handler = LambdaFunction.wrap(async (req: LambdaHttpRequest): Promise<LambdaHttpResponse> => {
  if (HmacSecret == null) throw new LambdaHttpResponse(500, 'Invalid $GITHUB_WEBHOOK_SECRET');

  if (req.body == null) throw new LambdaHttpResponse(500, 'Invalid request no body');
  const hmac = `sha256=${createHmac('sha256', HmacSecret).update(req.body).digest('hex')}`;
  if (req.header('X-Hub-Signature-256') !== hmac) throw new LambdaHttpResponse(400, 'Invalid X-Hub-Signature-256');

  const hook = req.json();
  const hookType = req.header('X-GitHub-Event') ?? 'unknown';
  const hookId = req.header('X-GitHub-Delivery') ?? req.id;

  req.set('hookType', hookType);
  req.set('hookId', hookId);

  for (const action of HookActions) {
    if (!action.is(hookType, hook)) continue;
    const res = action.process(hook);
    if (res == null) return new LambdaHttpResponse(200, 'skipped');
    req.log.info({ name: action.name }, 'Hook');

    const cleaned = cleanHook(res.hook);

    cleaned['@timestamp'] = res.timestamp;
    cleaned['@type'] = action.name;

    if (res.computed) cleaned['computed'] = res.computed;

    const index = indexName(res.prefix, res.timestamp);
    await client.index({ index: index, body: res.hook, id: hookId });
    return new LambdaHttpResponse(200, 'ok');
  }

  return new LambdaHttpResponse(400, 'Failed to process');
});
