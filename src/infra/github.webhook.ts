import { LambdaRestApi } from '@aws-cdk/aws-apigateway';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { CfnOutput, Construct, Stack, StackProps } from '@aws-cdk/core';

export class GithubWebhookStack extends Stack {
  constructor(scope?: Construct, id?: string, props?: StackProps) {
    super(scope, id, props);

    const lambda = new NodejsFunction(this, 'WebhookLambda', {
      entry: './build/src/index.js',
      handler: 'handler',
    });
    const restApi = new LambdaRestApi(this, 'WebhookApi', { handler: lambda });
    new CfnOutput(this, 'Url', { value: restApi.url });
  }
}
