import { CheckRunCompletedEvent } from '@octokit/webhooks-types';
import { HookAction, HookIndex, WebhookEnterprise } from '../hook.js';

export const CheckRunAction: HookAction<CheckRunCompletedEvent> = {
  name: 'check_run',
  is(type: string, e: unknown): e is CheckRunCompletedEvent {
    return type === 'check_run';
  },

  process(hook: CheckRunCompletedEvent & WebhookEnterprise): HookIndex {
    return { timestamp: hook.check_run.completed_at, hook };
  },
};
