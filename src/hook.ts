import { WebhookEvent } from '@octokit/webhooks-types';

export function indexName(org: string, type: string, date: string): string {
  return `github-hook-${org}-${type}-${date.slice(0, 7)}`;
}

export interface HookIndex {
  index: string;
  body: Record<string, unknown> & { '@timestamp': string };
}

export interface HookAction<T extends WebHookEnterpriseEvent> {
  name: string;
  is(type: string, e: WebHookEnterpriseEvent): e is T;
  process(hook: T & WebhookEnterprise): HookIndex | null;
}

export interface WebhookEnterprise {
  enterprise?: {
    id: number;
    slug: string;
  };
}

export type WebHookEnterpriseEvent = WebhookEvent & WebhookEnterprise;
