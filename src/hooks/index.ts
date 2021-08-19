import { HookAction, WebHookEvents } from '../hook';
import { CheckRunAction } from './hook.check.run.complete';
import { IssueCommentAction } from './hook.issue.comment';
import { LabelAction } from './hook.label';
import { OtherAction } from './hook.other';
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
  // This must be the last event
  OtherAction,
];
