import { PushEvent } from '@octokit/webhooks-types';
import { HookAction, HookIndex, WebhookEnterprise } from '../hook.js';

export const PushAction: HookAction<PushEvent> = {
  name: 'push',
  is(type: string, e: unknown): e is PushEvent {
    return type === 'push';
  },

  process(hook: PushEvent & WebhookEnterprise): HookIndex | null {
    if (hook.commits.length === 0) return null;
    return { timestamp: new Date().toISOString(), hook };
  },
};
