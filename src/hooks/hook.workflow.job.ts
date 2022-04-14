import { HookAction, HookIndex, WebhookEnterprise } from '../hook.js';

export interface WorkflowJobCompletedEvent {
  action: 'completed';
  workflow_job: {
    completed_at: string;
    started_at: string;
  };
}

export const WorkflowJobAction: HookAction<WorkflowJobCompletedEvent> = {
  name: 'workflow_job',
  is(type: string, e: unknown): e is WorkflowJobCompletedEvent {
    return type === 'workflow_job';
  },

  process(hook: WorkflowJobCompletedEvent & WebhookEnterprise): HookIndex | null {
    if (hook.action !== 'completed') return null;
    const updatedAt = hook.workflow_job.completed_at ?? new Date().toISOString();
    const duration = new Date(updatedAt).getTime() - new Date(hook.workflow_job.started_at).getTime();

    if (isNaN(duration)) return { timestamp: updatedAt, hook };
    return { timestamp: updatedAt, hook, computed: { duration } };
  },
};
