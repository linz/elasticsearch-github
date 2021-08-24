import { LabelEvent } from '@octokit/webhooks-types';
import { HookAction, HookIndex, WebhookEnterprise } from '../hook';

export const LabelAction: HookAction<LabelEvent> = {
  name: 'label',
  is(type: string, e: unknown): e is LabelEvent {
    return type === 'label';
  },

  process(hook: LabelEvent & WebhookEnterprise): HookIndex | null {
    return { timestamp: new Date().toISOString(), hook };
  },
};
