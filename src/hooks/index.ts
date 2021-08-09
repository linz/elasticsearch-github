import { HookAction, WebHookEvents } from '../hook';
import { CheckRunAction } from './hook.check.run.complete';
import { IssueCommentAction } from './hook.issue.comment';
import { LabelAction } from './hook.label';
import { PullRequestCommentAction } from './hook.pr.comment';
import { PushAction } from './hook.push';
import { StarAction } from './hook.star';
import { WorkflowJobAction } from './hook.workflow.job';

export const HookActions: HookAction<WebHookEvents>[] = [
  CheckRunAction,
  PushAction,
  PullRequestCommentAction,
  IssueCommentAction,
  StarAction,
  LabelAction,
  WorkflowJobAction,
];
