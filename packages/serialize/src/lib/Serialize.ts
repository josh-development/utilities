import { isObject } from './private';

export namespace Serialize {
  /**
   * Converts data into a compatible JSON format.
   * @since 1.0.0
   * @param data The data to convert.
   * @returns The converted data.
   */
  export function toJSON(data: unknown): JSON {
    if (Array.isArray(data)) return { [Keying.Type]: Type.Array, [Keying.Value]: toJSONArray(data) };
    else if (typeof data === 'bigint') return { [Keying.Type]: Type.BigInt, [Keying.Value]: data.toString() };
    else if (typeof data === 'boolean') return { [Keying.Type]: Type.Boolean, [Keying.Value]: data };
    else if (data instanceof Date) return { [Keying.Type]: Type.Date, [Keying.Value]: data.toJSON() };
    else if (data instanceof Map) return { [Keying.Type]: Type.Map, [Keying.Value]: toJSONEntries(Array.from(data)) };
    else if (data === null) return { [Keying.Type]: Type.Null, [Keying.Value]: null };
    else if (typeof data === 'number') {
      if (Number.isNaN(data)) return { [Keying.Type]: Type.Number, [Keying.Value]: 'NaN' };
      if ([Infinity, -Infinity].includes(data)) return { [Keying.Type]: Type.Number, [Keying.Value]: String(data) };

      return { [Keying.Type]: Type.Number, [Keying.Value]: data };
    } else if (isObject(data)) return { [Keying.Type]: Type.Object, [Keying.Value]: toJSONObject(data) };
    else if (data instanceof RegExp) {
      return { [Keying.Type]: Type.RegExp, [Keying.Value]: { [Keying.Source]: data.source, [Keying.Flags]: data.flags } };
    } else if (data instanceof Set) return { [Keying.Type]: Type.Set, [Keying.Value]: toJSONArray(Array.from(data)) };
    else if (typeof data === 'string') return { [Keying.Type]: Type.String, [Keying.Value]: data };
    else if (data === undefined) return { [Keying.Type]: Type.Undefined, [Keying.Value]: 'undefined' };

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
      if (Object.prototype.hasOwnProperty.call(object, key)) {
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
    const { [Keying.Type]: type, [Keying.Value]: value } = json;

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
        if (typeof value === 'string') return Number(value);

        return value;

      case Type.Object:
        return fromJSONObject(value as Record<PropertyKey, JSON>);

      case Type.RegExp:
        return new RegExp((value as Regex)[Keying.Source], (value as Regex)[Keying.Flags]);

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
      if (Object.prototype.hasOwnProperty.call(json, key)) {
        obj[key] = fromJSON(json[key]);
      }
    }

    return obj;
  }

  export enum Keying {
    Type = 't',

    Value = 'v',

    Source = 's',

    Flags = 'f'
  }
  export interface Regex {
    [Keying.Source]: string;

    [Keying.Flags]: string;
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
    [Keying.Type]: Type;

    /**
     * The value for this json.
     * @since 1.0.0
     */
    [Keying.Value]: string | number | boolean | null | JSON[] | [PropertyKey, JSON][] | Record<PropertyKey, JSON> | Regex;
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
