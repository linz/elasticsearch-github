import { CheckRunCompletedEvent, WebhookEvent } from '@octokit/webhooks-types';
import { HookAction, HookIndex, indexName, WebhookEnterprise } from './hook';

export const CheckRunAction: HookAction<CheckRunCompletedEvent> = {
  name: 'check_run',
  is(type: string, e: WebhookEvent): e is CheckRunCompletedEvent {
    return 'check_run' in e && e.action === 'completed';
  },

  process(hook: CheckRunCompletedEvent & WebhookEnterprise): HookIndex {
    const orgId = hook.organization?.login ?? 'unknown';

    return {
      index: indexName(orgId, 'check', hook.check_run.completed_at),
      body: {
        '@timestamp': hook.check_run.completed_at,
        '@type': 'check_run',

        ...hook,
        check_run: {
          ...hook.check_run,
          app: hook.check_run.app.name,
          check_suite: {
            ...hook.check_run.check_suite,
            app: hook.check_run.check_suite.app.name,
          },
        },
        repository: hook.repository.full_name,
        sender: hook.sender.login,
        organization: orgId,
        enterprise: undefined,
        computed: {
          duration: new Date(hook.check_run.completed_at).getTime() - new Date(hook.check_run.started_at).getTime(),
        },
      },
    };
  },
};
