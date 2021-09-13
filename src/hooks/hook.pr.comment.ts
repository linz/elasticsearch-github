import { PullRequestReviewCommentEvent } from '@octokit/webhooks-types';
import { HookAction, HookIndex } from '../hook.js';

export const PullRequestCommentAction: HookAction<PullRequestReviewCommentEvent> = {
  name: 'pull_request_review_comment',
  is(type: string, e: unknown): e is PullRequestReviewCommentEvent {
    return type === 'pull_request_review_comment';
  },

  process(hook: PullRequestReviewCommentEvent): HookIndex | null {
    return { timestamp: hook.comment.created_at, hook };
  },
};
