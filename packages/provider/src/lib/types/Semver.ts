/**
 * Represents a [Semver](https://semver.org/) version with an object.
 * @since 1.0.0
 *
 * @example
 * const version = { major: 1, minor: 3, patch: 9 };
 */
export interface Semver {
  /**
   * The major iteration of this version.
   * @since 1.0.0
   */
  major: number;

  /**
   * The minor iteration of this version.
   * @since 1.0.0
   */
  minor: number;

  /**
   * The patch iteration of this version.
   * @since 1.0.0
   */
  patch: number;
}
