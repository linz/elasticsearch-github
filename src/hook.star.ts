import { StarEvent } from '@octokit/webhooks-types';
import { HookAction, HookIndex, indexName, WebhookEnterprise, WebHookEnterpriseEvent } from './hook';

export const StarAction: HookAction<StarEvent> = {
  name: 'star',
  is(type: string, e: WebHookEnterpriseEvent): e is StarEvent {
    return type === 'star';
  },

  process(hook: StarEvent & WebhookEnterprise): HookIndex | null {
    const orgId = hook.organization?.login ?? 'unknown';

    const staredAt = hook.starred_at ?? new Date().toISOString();
    return {
      index: indexName(orgId, 'push', staredAt),
      body: {
        '@timestamp': staredAt,
        '@type': StarAction.name,
        ...hook,
        repository: hook.repository.full_name,
        sender: hook.sender.login,
        organization: orgId,
        enterprise: undefined,
        computed: {},
      },
    };
  },
};
