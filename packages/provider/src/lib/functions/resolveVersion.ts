import type { Semver } from '../types';

/**
 * Resolve a Semver version string into a Semver version object.
 * @param version The Semver version string to resolve.
 * @returns The resolved Semver version object.
 * @since 1.0.0
 * @example
 * ```typescript
 * resolveVersion('1.2.3'); // { major: 1, minor: 2, patch: 3 }
 */
export function resolveVersion(version: string): Semver {
  const [major, minor, patch] = version.split('.').map(Number);

  return { major, minor, patch };
}
