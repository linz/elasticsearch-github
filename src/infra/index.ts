import { App } from 'aws-cdk-lib';
import { GithubWebhookStack } from './github.webhook.js';
import 'dotenv/config';

const app = new App();

new GithubWebhookStack(app, 'GithubWebhookUrl');
