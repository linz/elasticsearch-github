import { WebhookEvent } from '@octokit/webhooks-types';
import { WorkflowJobCompletedEvent } from './hooks/hook.workflow.job.js';

export function indexName(date: string): string {
  return `github-hook-${date.slice(0, 7)}`;
}

export interface HookIndex {
  timestamp: string;
  hook: WebHookEnterpriseEvent;
  computed?: Record<string, unknown>;
}

export interface HookAction<T extends WebHookEnterpriseEvent> {
  name: string;
  is(type: string, e: unknown): e is T;
  process(hook: T & WebhookEnterprise): HookIndex | null;
}

export interface WebhookEnterprise {
  enterprise?: {
    id: number;
    slug: string;
  };
}

export type WebHookEvents = WebhookEvent | WorkflowJobCompletedEvent;
export type WebHookEnterpriseEvent = WebHookEvents & WebhookEnterprise;
