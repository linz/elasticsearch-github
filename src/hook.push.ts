import { PushEvent } from '@octokit/webhooks-types';
import { HookAction, HookIndex, indexName, WebhookEnterprise, WebHookEnterpriseEvent } from './hook';

export const PushAction: HookAction<PushEvent> = {
  name: 'push',
  is(type: string, e: WebHookEnterpriseEvent): e is PushEvent {
    return type === 'push';
  },

  process(hook: PushEvent & WebhookEnterprise): HookIndex | null {
    const orgId = hook.organization?.login ?? 'unknown';

    if (hook.head_commit == null) return null;
    return {
      index: indexName(orgId, 'push', hook.head_commit.timestamp),
      body: {
        '@timestamp': hook.head_commit.timestamp,
        ...hook,
        repository: hook.repository.full_name,
        sender: hook.sender.login,
        organization: orgId,
        enterprise: undefined,
        computed: {
          count: hook.commits.length,
        },
      },
    };
  },
};
