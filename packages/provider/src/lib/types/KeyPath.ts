/**
 * A key and path represented by a string or a json object.
 * @since 1.0.0
 * @example
 * ```json
 * "key.path.to.value"
 * ```
 *
 * @example
 * ```json
 * {
 *   "key": "key",
 *   "path": "path.to.value"
 * }
 * ```
 *
 * @example
 * ```json
 * {
 *   "key": "key",
 *   "path": "path.to.value"
 * }
 * ```
 *
 * @example
 * ```json
 * {
 *   "key": "key",
 *   "path": ["path", "to", "value"]
 * }
 * ```
 */
export type KeyPath = string | KeyPathJson;

/**
 * A path represented by a string or an array of strings.
 * @since 1.0.0
 * @example
 * ```json
 * "path.to.key"
 * ```
 *
 * @example
 * ```json
 * ["path", "to", "value"]
 * ```
 */
export type Path = string | string[];

/**
 * A key and path represented by a json object.
 * @since 1.0.0
 * @example
 * ```json
 * {
 *   "key": "key",
 *   "path": "path.to.value"
 * }
 * ```
 *
 * @example
 * ```json
 * {
 *   "key": "key",
 *   "path": ["path", "to", "value"]
 * }
 * ```
 */
export interface KeyPathJson {
  key: string;

  path?: Path;
}
