import { isObject } from './private';

export namespace Serialize {
  export function toJSON(data: unknown): JSON {
    if (Array.isArray(data)) return { type: Type.Array, value: toJSONArray(data) };
    else if (typeof data === 'bigint') return { type: Type.BigInt, value: data.toString() };
    else if (typeof data === 'boolean') return { type: Type.Boolean, value: data };
    else if (data instanceof Date) return { type: Type.Date, value: data.toJSON() };
    else if (data instanceof Map) return { type: Type.Map, value: toJSONEntries(Array.from(data)) };
    else if (data === null) return { type: Type.Null, value: null };
    else if (typeof data === 'number') return { type: Type.Number, value: data };
    else if (isObject(data)) return { type: Type.Object, value: toJSONObject(data) };
    else if (data instanceof RegExp) return { type: Type.RegExp, value: { source: data.source, flags: data.flags } };
    else if (data instanceof Set) return { type: Type.Set, value: toJSONArray(Array.from(data)) };
    else if (typeof data === 'string') return { type: Type.String, value: data };
    else if (data === undefined) return { type: Type.Undefined, value: 'undefined' };

    throw new TypeError('Serialize received an unknown type while formatting.');
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

  export function fromJSON(json: JSON): unknown {
    const { type, value } = json;

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
        return new RegExp((value as { source: string; flags: string }).source, (value as { source: string; flags: string }).flags);

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
    return json.reduce<unknown[]>((raw, value) => [...raw, fromJSON(value)], []);
  }

  function fromJSONMap(json: [PropertyKey, JSON][]): [PropertyKey, unknown][] {
    return json.reduce<[PropertyKey, unknown][]>((raw, [key, value]) => [...raw, [key, fromJSON(value)]], []);
  }

  function fromJSONObject(json: Record<PropertyKey, JSON>): Record<PropertyKey, unknown> {
    return Object.entries(json).reduce<Record<PropertyKey, unknown>>((raw, [key, value]) => ({ ...raw, [key]: fromJSON(value) }), {});
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
    type: Type;

    /**
     * The value for this json.
     * @since 1.0.0
     */
    value: string | number | boolean | null | JSON[] | [PropertyKey, JSON][] | Record<PropertyKey, JSON> | { source: string; flags: string };
  }

  export enum Type {
    Array = 'array',

    BigInt = 'bigint',

    Boolean = 'boolean',

    Date = 'date',

    Map = 'map',

    Null = 'null',

    Number = 'number',

    Object = 'object',

    RegExp = 'regexp',

    Set = 'set',

    String = 'string',

    Undefined = 'undefined'
  }
}
