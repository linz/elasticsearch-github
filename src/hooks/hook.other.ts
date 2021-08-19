import { HookAction, HookIndex, WebHookEnterpriseEvent } from '../hook';

export const OtherAction: HookAction<WebHookEnterpriseEvent> = {
  name: 'other',
  is(type: string, e: unknown): e is WebHookEnterpriseEvent {
    return type === 'other';
  },

  process(hook: WebHookEnterpriseEvent): HookIndex | null {
    return { prefix: 'other', timestamp: new Date().toISOString(), hook };
  },
};
