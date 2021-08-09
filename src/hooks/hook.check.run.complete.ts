import { CheckRunCompletedEvent, WebhookEvent } from '@octokit/webhooks-types';
import { HookAction, HookIndex, WebhookEnterprise } from '../hook';

export const CheckRunAction: HookAction<CheckRunCompletedEvent> = {
  name: 'check_run',
  is(type: string, e: WebhookEvent): e is CheckRunCompletedEvent {
    return 'check_run' in e && e.action === 'completed';
  },

  process(hook: CheckRunCompletedEvent & WebhookEnterprise): HookIndex {
    return {
      prefix: 'check',
      timestamp: hook.check_run.completed_at,
      hook,
    };
  },
};
