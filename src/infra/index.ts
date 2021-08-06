import { App } from '@aws-cdk/core';
import { GithubWebhookStack } from './github.webhook';
import 'dotenv/config';

const app = new App();

new GithubWebhookStack(app, 'WebhookToEs');
