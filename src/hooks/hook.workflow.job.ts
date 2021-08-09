import { WorkflowRunEvent } from '@octokit/webhooks-types';
import { HookAction, HookIndex, WebhookEnterprise, WebHookEnterpriseEvent } from '../hook';

export const WorkflowJobAction: HookAction<WorkflowRunEvent> = {
  name: 'workflow_run',
  is(type: string, e: WebHookEnterpriseEvent): e is WorkflowRunEvent {
    return type === 'workflow_run';
  },

  process(hook: WorkflowRunEvent & WebhookEnterprise): HookIndex | null {
    const updatedAt = hook.workflow_run.updated_at ?? new Date().toISOString();
    return { prefix: 'workflow', timestamp: updatedAt, hook };
  },
};
