import { HookAction, HookIndex, WebhookEnterprise, WebHookEnterpriseEvent } from '../hook';

export interface WorkflowJobCompletedEvent {
  action: 'completed';
  workflow_job: {
    completed_at: string;
    started_at: string;
  };
}

export const WorkflowJobAction: HookAction<WorkflowJobCompletedEvent> = {
  name: 'workflow_job',
  is(type: string, e: WebHookEnterpriseEvent): e is WorkflowJobCompletedEvent {
    return type === 'workflow_job';
  },

  process(hook: WorkflowJobCompletedEvent & WebhookEnterprise): HookIndex | null {
    if (hook.action !== 'completed') return null;
    const updatedAt = hook.workflow_job.completed_at ?? new Date().toISOString();
    return {
      prefix: 'workflow',
      timestamp: updatedAt,
      hook,
      computed: {
        duration: new Date(hook.workflow_job.completed_at).getTime() - new Date(hook.workflow_job.started_at).getTime(),
      },
    };
  },
};
