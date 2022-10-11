import type { Semver } from '../types';

export function resolveVersion(version: string): Semver {
  const [major, minor, patch] = version.split('.').map(Number);

  return { major, minor, patch };
}
