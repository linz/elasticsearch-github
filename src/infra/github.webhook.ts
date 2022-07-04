import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { FunctionUrl, FunctionUrlAuthType, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { execFileSync } from 'child_process';
import { Construct } from 'constructs';

export class GithubWebhookStack extends Stack {
  constructor(scope?: Construct, id?: string, props?: StackProps) {
    super(scope, id, props);

    const lambda = new NodejsFunction(this, 'WebhookLambda', {
      entry: './build/src/index.js',
      runtime: Runtime.NODEJS_16_X,
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

    const functionUrl = new FunctionUrl(this, 'WebhookUrl', {
      authType: FunctionUrlAuthType.NONE,
      function: lambda,
    });
    new CfnOutput(this, 'Url', { value: functionUrl.url });
  }
}
