import { HookAction, HookIndex, WebHookEnterpriseEvent } from '../hook.js';

export const OtherAction: HookAction<WebHookEnterpriseEvent> = {
  name: 'other',
  is(type: string, e: unknown): e is WebHookEnterpriseEvent {
    return true;
  },

  process(hook: WebHookEnterpriseEvent): HookIndex | null {
    return { timestamp: new Date().toISOString(), hook };
  },
};
