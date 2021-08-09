import { LabelEvent } from '@octokit/webhooks-types';
import { HookAction, HookIndex, WebhookEnterprise, WebHookEnterpriseEvent } from '../hook';

export const LabelAction: HookAction<LabelEvent> = {
  name: 'label',
  is(type: string, e: WebHookEnterpriseEvent): e is LabelEvent {
    return type === 'label';
  },

  process(hook: LabelEvent & WebhookEnterprise): HookIndex | null {
    return {
      prefix: 'label',
      timestamp: new Date().toISOString(),
      hook,
    };
  },
};
