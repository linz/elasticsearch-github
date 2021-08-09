import { PushEvent } from '@octokit/webhooks-types';
import { HookAction, HookIndex, WebhookEnterprise, WebHookEnterpriseEvent } from '../hook';

export const PushAction: HookAction<PushEvent> = {
  name: 'push',
  is(type: string, e: WebHookEnterpriseEvent): e is PushEvent {
    return type === 'push';
  },

  process(hook: PushEvent & WebhookEnterprise): HookIndex | null {
    if (hook.commits.length === 0) return null;
    return {
      prefix: 'push',
      timestamp: new Date().toISOString(),
      hook,
    };
  },
};
