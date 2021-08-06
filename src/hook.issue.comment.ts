import { IssueCommentEvent } from '@octokit/webhooks-types';
import { HookAction, HookIndex, indexName, WebHookEnterpriseEvent } from './hook';

export const IssueCommentAction: HookAction<IssueCommentEvent> = {
  name: 'issue_comment',
  is(type: string, e: WebHookEnterpriseEvent): e is IssueCommentEvent {
    return type === 'issue_comment';
  },

  process(hook: IssueCommentEvent): HookIndex | null {
    const orgId = hook.organization?.login ?? 'unknown';

    return {
      index: indexName(orgId, 'issue', hook.comment.created_at),
      body: {
        '@timestamp': hook.comment.created_at,
        '@type': 'issue_comment',
        ...hook,
        issue: {
          ...hook.issue,
          user: hook.issue.user.login,
        },
        comment: {
          ...hook.comment,
          user: hook.comment.user.login,
        },
        repository: hook.repository.full_name,
        sender: hook.sender.login,
        organization: orgId,
        enterprise: undefined,
        computed: {},
      },
    };
  },
};
