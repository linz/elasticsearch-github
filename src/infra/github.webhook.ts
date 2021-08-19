import { LambdaRestApi } from '@aws-cdk/aws-apigateway';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { CfnOutput, Construct, Stack, StackProps } from '@aws-cdk/core';
import { execFileSync } from 'child_process';

export class GithubWebhookStack extends Stack {
  constructor(scope?: Construct, id?: string, props?: StackProps) {
    super(scope, id, props);

    const lambda = new NodejsFunction(this, 'WebhookLambda', {
      entry: './build/src/index.js',
      handler: 'handler',
      environment: {
        GITHUB_WEBHOOK_SECRET: process.env.GITHUB_WEBHOOK_SECRET ?? '',
        ELASTIC_CLOUD_USERNAME: process.env.ELASTIC_CLOUD_USERNAME ?? '',
        ELASTIC_CLOUD_PASSWORD: process.env.ELASTIC_CLOUD_PASSWORD ?? '',
        ELASTIC_CLOUD_ID: process.env.ELASTIC_CLOUD_ID ?? '',
        GIT_HASH: execFileSync('git', ['rev-parse', 'HEAD']).toString().trim(),
        GIT_VERSION: execFileSync('git', ['describe', '--tags', '--always', '--match', 'v*']).toString().trim(),
      },
    });
    const restApi = new LambdaRestApi(this, 'WebhookApi', { handler: lambda });
    new CfnOutput(this, 'Url', { value: restApi.url });
  }
}
