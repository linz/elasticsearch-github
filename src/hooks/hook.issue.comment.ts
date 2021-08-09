import { IssueCommentEvent } from '@octokit/webhooks-types';
import { HookAction, HookIndex } from '../hook';

export const IssueCommentAction: HookAction<IssueCommentEvent> = {
  name: 'issue_comment',
  is(type: string, e: unknown): e is IssueCommentEvent {
    return type === 'issue_comment';
  },

  process(hook: IssueCommentEvent): HookIndex | null {
    return {
      prefix: 'comment',
      timestamp: hook.comment.created_at,
      hook,
    };
  },
};
