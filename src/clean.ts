/** Remove all the referenced urls */
function cleanObjects(o: Record<string, any>): Record<string, unknown> {
  for (const [key, value] of Object.entries(o)) {
    if (typeof value === 'string' && value.startsWith('https://api.github.com/')) delete o[key];
    else if (typeof value === 'object' && value !== null) o[key] = cleanObjects(o[key]);

    // is repo just store the full name
    if (key === 'repository' && typeof value === 'object') {
      if (value.default_branch) o[key] = value.full_name;
    }
  }
  return o;
}

export function cleanHook(hook: Record<string, any>): Record<string, unknown> {
  const cleaned = cleanObjects(hook);
  delete hook.enterprise;

  const orgId = hook.organization?.login ?? 'unknown';
  hook.organization = orgId;

  return cleaned;
}
