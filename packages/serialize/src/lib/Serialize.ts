import { isObject } from './private';

export namespace Serialize {
  /**
   * Converts data into a compatible JSON format.
   * @since 1.0.0
   * @param data The data to convert.
   * @returns The converted data.
   */
  export function toJSON(data: unknown): JSON {
    if (Array.isArray(data)) return { t: Type.Array, v: toJSONArray(data) };
    else if (typeof data === 'bigint') return { t: Type.BigInt, v: data.toString() };
    else if (typeof data === 'boolean') return { t: Type.Boolean, v: data };
    else if (data instanceof Date) return { t: Type.Date, v: data.toJSON() };
    else if (data instanceof Map) return { t: Type.Map, v: toJSONEntries(Array.from(data)) };
    else if (data === null) return { t: Type.Null, v: null };
    else if (typeof data === 'number') return { t: Type.Number, v: data };
    else if (isObject(data)) return { t: Type.Object, v: toJSONObject(data) };
    else if (data instanceof RegExp) return { t: Type.RegExp, v: { sr: data.source, f: data.flags } };
    else if (data instanceof Set) return { t: Type.Set, v: toJSONArray(Array.from(data)) };
    else if (typeof data === 'string') return { t: Type.String, v: data };
    else if (data === undefined) return { t: Type.Undefined, v: 'undefined' };

    throw new TypeError(
      `Serialize received an unknown type while formatting: "${data.constructor.name}", see @joshdb/transform for custom serialization`
    );
  }

  function toJSONArray(array: unknown[]): JSON[] {
    return array.reduce<JSON[]>((json, value) => [...json, toJSON(value)], []);
  }

  function toJSONEntries(entries: [PropertyKey, unknown][]): [PropertyKey, JSON][] {
    return entries.reduce<[PropertyKey, JSON][]>((json, [key, value]) => [...json, [key, toJSON(value)]], []);
  }

  function toJSONObject(object: Record<PropertyKey, unknown>): Record<PropertyKey, JSON> {
    return Object.entries(object).reduce<Record<PropertyKey, JSON>>((json, [key, value]) => ({ ...json, [key]: toJSON(value) }), {});
  }

  /**
   * Converts data from a compatible JSON format.
   * @since 1.0.0
   * @param json The data to convert.
   * @returns The converted data.
   */
  export function fromJSON(json: JSON): unknown {
    const { t: type, v: value } = json;

    switch (type) {
      case Type.Array:
        return fromJSONArray(value as JSON[]);

      case Type.BigInt:
        return BigInt(value as string);

      case Type.Boolean:
        return value;

      case Type.Date:
        return new Date(value as string);

      case Type.Map:
        return new Map(fromJSONMap(value as [PropertyKey, JSON][]));

      case Type.Null:
        return null;

      case Type.Number:
        return value;

      case Type.Object:
        return fromJSONObject(value as Record<PropertyKey, JSON>);

      case Type.RegExp:
        return new RegExp((value as { sr: string; f: string }).sr, (value as { sr: string; f: string }).f);

      case Type.Set:
        return new Set(fromJSONArray(value as JSON[]));

      case Type.String:
        return value;

      case Type.Undefined:
        return undefined;

      default:
        throw new TypeError('Serialize received an unknown type.');
    }
  }

  function fromJSONArray(json: JSON[]): unknown[] {
    const arr: unknown[] = [];

    for (const value of json) arr.push(fromJSON(value));
    return arr;
  }

  function fromJSONMap(json: [PropertyKey, JSON][]): [PropertyKey, unknown][] {
    const arr: [PropertyKey, unknown][] = [];

    for (const [key, value] of json) arr.push([key, fromJSON(value)]);
    return arr;
  }

  function fromJSONObject(json: Record<PropertyKey, JSON>): Record<PropertyKey, unknown> {
    const obj: Record<PropertyKey, unknown> = {};

    for (const [key, value] of Object.entries(json)) obj[key] = fromJSON(value);
    return obj;
  }

  /**
   * The json format type interface.
   * @since 1.0.0
   */
  export interface JSON {
    /**
     * The type of {@link JSON.value}
     * @since 1.0.0
     */
    t: Type;

    /**
     * The value for this json.
     * @since 1.0.0
     */
    v: string | number | boolean | null | JSON[] | [PropertyKey, JSON][] | Record<PropertyKey, JSON> | { sr: string; f: string };
  }

  /**
   * The json format type enum.
   * @since 1.0.0
   */
  export enum Type {
    Array = 'a',

    BigInt = 'bi',

    Boolean = 'b',

    Date = 'd',

    Map = 'm',

    Null = 'nl',

    Number = 'n',

    Object = 'o',

    RegExp = 'r',

    Set = 'se',

    String = 's',

    Undefined = 'u'
  }
}
