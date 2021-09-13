import { App } from '@aws-cdk/core';
import { GithubWebhookStack } from './github.webhook.js';
import 'dotenv/config';

const app = new App();

new GithubWebhookStack(app, 'GithubWebhook');
