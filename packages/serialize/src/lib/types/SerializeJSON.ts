import type { SerializeType } from './SerializeType';

/**
 * The json format type interface.
 * @since 1.0.0
 */
export interface SerializeJSON {
  /**
   * The type of {@link SerializeJSON.value}
   * @since 1.0.0
   */
  type: SerializeType;

  /**
   * The value for this json.
   * @since 1.0.0
   */
  value:
    | string
    | number
    | boolean
    | null
    | SerializeJSON[]
    | [PropertyKey, SerializeJSON][]
    | Record<PropertyKey, SerializeJSON>
    | { source: string; flags: string };
}
