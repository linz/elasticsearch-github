import { StarEvent } from '@octokit/webhooks-types';
import { HookAction, HookIndex, WebhookEnterprise, WebHookEnterpriseEvent } from '../hook';

export const StarAction: HookAction<StarEvent> = {
  name: 'star',
  is(type: string, e: WebHookEnterpriseEvent): e is StarEvent {
    return type === 'star';
  },

  process(hook: StarEvent & WebhookEnterprise): HookIndex | null {
    const staredAt = hook.starred_at ?? new Date().toISOString();
    return { prefix: 'star', timestamp: staredAt, hook };
  },
};
