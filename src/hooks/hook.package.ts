import { HookAction, HookIndex, RegistryPackageEvent, WebhookEnterprise, PackageEvent } from '../hook.js';

export const PackageAction: HookAction<PackageEvent> = {
  name: 'package',
  is(type: string, e: unknown): e is PackageEvent {
    return type === 'package';
  },

  process(hook: PackageEvent & WebhookEnterprise): HookIndex | null {
    // Some `body` are string some are objects overwrite convert it into a object
    if (typeof hook.package.package_version.body === 'string') {
      hook.package.package_version.body_text = hook.package.package_version.body;
      delete hook.package.package_version.body;
    }
    return { timestamp: new Date().toISOString(), hook };
  },
};

export const RegistryPackageAction: HookAction<RegistryPackageEvent> = {
  name: 'registry_package',
  is(type: string, e: unknown): e is RegistryPackageEvent {
    return type === 'registry_package';
  },

  process(hook: RegistryPackageEvent & WebhookEnterprise): HookIndex | null {
    // Some `body` are string some are objects overwrite convert it into a object
    if (typeof hook.package_version.body === 'string') {
      hook.package_version.body_text = hook.package_version.body;
      delete hook.package_version.body;
    }
    return { timestamp: new Date().toISOString(), hook };
  },
};
