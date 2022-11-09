import { isObject } from './private';

export namespace Serialize {
  /**
   * Converts data into a compatible JSON format.
   * @since 1.0.0
   * @param data The data to convert.
   * @returns The converted data.
   */
  export function toJSON(data: unknown): JSON {
    if (Array.isArray(data)) return { [Names.Type]: Type.Array, [Names.Value]: toJSONArray(data) };
    else if (typeof data === 'bigint') return { [Names.Type]: Type.BigInt, [Names.Value]: data.toString() };
    else if (typeof data === 'boolean') return { [Names.Type]: Type.Boolean, [Names.Value]: data };
    else if (data instanceof Date) return { [Names.Type]: Type.Date, [Names.Value]: data.toJSON() };
    else if (data instanceof Map) return { [Names.Type]: Type.Map, [Names.Value]: toJSONEntries(Array.from(data)) };
    else if (data === null) return { [Names.Type]: Type.Null, [Names.Value]: null };
    else if (typeof data === 'number') return { [Names.Type]: Type.Number, [Names.Value]: data };
    else if (isObject(data)) return { [Names.Type]: Type.Object, [Names.Value]: toJSONObject(data) };
    else if (data instanceof RegExp) return { [Names.Type]: Type.RegExp, [Names.Value]: { s: data.source, f: data.flags } };
    else if (data instanceof Set) return { [Names.Type]: Type.Set, [Names.Value]: toJSONArray(Array.from(data)) };
    else if (typeof data === 'string') return { [Names.Type]: Type.String, [Names.Value]: data };
    else if (data === undefined) return { [Names.Type]: Type.Undefined, [Names.Value]: 'undefined' };

    throw new TypeError(
      `Serialize received an unknown type while formatting: "${data.constructor.name}", see @joshdb/transform for custom serialization`
    );
  }

  function toJSONArray(array: unknown[]): JSON[] {
    const json: JSON[] = [];

    for (const value of array) json.push(toJSON(value));
    return json;
  }

  function toJSONEntries(entries: [PropertyKey, unknown][]): [PropertyKey, JSON][] {
    const json: [PropertyKey, JSON][] = [];

    for (const [key, value] of entries) json.push([key, toJSON(value)]);
    return json;
  }

  function toJSONObject(object: Record<PropertyKey, unknown>): Record<PropertyKey, JSON> {
    const json: Record<PropertyKey, JSON> = {};

    for (const key in object) {
      if ({}.hasOwnProperty.call(object, key)) {
        json[key] = toJSON(object[key]);
      }
    }

    return json;
  }

  /**
   * Converts data from a compatible JSON format.
   * @since 1.0.0
   * @param json The data to convert.
   * @returns The converted data.
   */
  export function fromJSON(json: JSON): unknown {
    const { [Names.Type]: type, [Names.Value]: value } = json;

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
        return new RegExp((value as { s: string; f: string }).s, (value as { s: string; f: string }).f);

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

    for (const key in json) {
      if ({}.hasOwnProperty.call(json, key)) {
        obj[key] = fromJSON(json[key]);
      }
    }

    return obj;
  }

  export enum Names {
    Type = 't',
    Value = 'v'
  }
  /**
   * The json format type interface.
   * @since 1.0.0
   */
  export interface JSON {
    /**
     * The type of {@link JSON.v}
     * @since 1.0.0
     */
    [Names.Type]: Type;

    /**
     * The value for this json.
     * @since 1.0.0
     */
    [Names.Value]: string | number | boolean | null | JSON[] | [PropertyKey, JSON][] | Record<PropertyKey, JSON> | { s: string; f: string };
  }

  /**
   * The json format type enum.
   * @since 1.0.0
   */
  export enum Type {
    Array = 0,

    BigInt = 11,

    Boolean = 2,

    Date = 3,

    Map = 4,

    Null = 5,

    Number = 6,

    Object = 7,

    RegExp = 10,

    Set = 9,

    String = 8,

    Undefined = 1
  }
}
