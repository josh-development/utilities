import { isObject } from './private';
import { SerializeJSON, SerializeType } from './types';

export function toJSON(data: unknown): SerializeJSON {
  if (Array.isArray(data)) return { type: SerializeType.Array, value: toJSONArray(data) };
  else if (typeof data === 'bigint') return { type: SerializeType.BigInt, value: data.toString() };
  else if (typeof data === 'boolean') return { type: SerializeType.Boolean, value: data };
  else if (data instanceof Date) return { type: SerializeType.Date, value: data.toJSON() };
  else if (data instanceof Map) return { type: SerializeType.Map, value: toJSONEntries(Array.from(data)) };
  else if (data === null) return { type: SerializeType.Null, value: null };
  else if (typeof data === 'number') return { type: SerializeType.Number, value: data };
  else if (isObject(data)) return { type: SerializeType.Object, value: toJSONObject(data) };
  else if (data instanceof RegExp) return { type: SerializeType.RegExp, value: { source: data.source, flags: data.flags } };
  else if (data instanceof Set) return { type: SerializeType.Set, value: toJSONArray(Array.from(data)) };
  else if (typeof data === 'string') return { type: SerializeType.String, value: data };
  else if (data === undefined) return { type: SerializeType.Undefined, value: 'undefined' };

  throw new TypeError('Serialize received an unknown type while formatting.');
}

function toJSONArray(array: unknown[]): SerializeJSON[] {
  return array.reduce<SerializeJSON[]>((json, value) => [...json, toJSON(value)], []);
}

function toJSONEntries(entries: [PropertyKey, unknown][]): [PropertyKey, SerializeJSON][] {
  return entries.reduce<[PropertyKey, SerializeJSON][]>((json, [key, value]) => [...json, [key, toJSON(value)]], []);
}

function toJSONObject(object: Record<PropertyKey, unknown>): Record<PropertyKey, SerializeJSON> {
  return Object.entries(object).reduce<Record<PropertyKey, SerializeJSON>>((json, [key, value]) => ({ ...json, [key]: toJSON(value) }), {});
}
