import { HookAction, WebHookEvents } from '../hook.js';
import { CheckRunAction } from './hook.check.run.complete.js';
import { IssueCommentAction } from './hook.issue.comment.js';
import { LabelAction } from './hook.label.js';
import { OtherAction } from './hook.other.js';
import { PullRequestCommentAction } from './hook.pr.comment.js';
import { PushAction } from './hook.push.js';
import { StarAction } from './hook.star.js';
import { WorkflowJobAction } from './hook.workflow.job.js';

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
