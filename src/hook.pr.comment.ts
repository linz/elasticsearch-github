import { PullRequestReviewCommentEvent } from '@octokit/webhooks-types';
import { HookAction, HookIndex, indexName, WebHookEnterpriseEvent } from './hook';

export const PullRequestCommentAction: HookAction<PullRequestReviewCommentEvent> = {
  name: 'pull_request_review_comment',
  is(type: string, e: WebHookEnterpriseEvent): e is PullRequestReviewCommentEvent {
    return type === 'pull_request_review_comment';
  },

  process(hook: PullRequestReviewCommentEvent): HookIndex | null {
    const orgId = hook.organization?.login ?? 'unknown';

    return {
      index: indexName(orgId, 'comment', hook.comment.created_at),
      body: {
        '@timestamp': hook.comment.created_at,
        '@type': 'pull_request_review_comment',
        ...hook,
        comment: {
          ...hook.comment,
          user: hook.comment.user.login,
          _links: undefined,
        },
        pull_request: {
          url: hook.pull_request.html_url,
          number: hook.pull_request.number,
          user: hook.pull_request.user.login,
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
