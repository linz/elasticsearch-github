import { WorkflowRunEvent } from '@octokit/webhooks-types';
import { HookAction, HookIndex, WebhookEnterprise, WebHookEnterpriseEvent } from '../hook';

export const WorkflowJobAction: HookAction<WorkflowRunEvent> = {
  name: 'workflow_job',
  is(type: string, e: WebHookEnterpriseEvent): e is WorkflowRunEvent {
    return type === 'workflow_job';
  },

  process(hook: WorkflowRunEvent & WebhookEnterprise): HookIndex | null {
    const updatedAt = hook.workflow_run.updated_at ?? new Date().toISOString();
    if (hook.action !== 'completed') return null;
    return { prefix: 'workflow', timestamp: updatedAt, hook };
  },
};
