import { User } from '@octokit/webhooks-types';

export function fromUser(u: User): { login: string; name?: string; type: string } {
  return { login: u.login, name: u.name, type: u.type };
}
