import { SerializeJSON, SerializeType } from './types';

export function toRaw(json: SerializeJSON): unknown {
  const { type, value } = json;

  switch (type) {
    case SerializeType.Array:
      return toRawArray(value as SerializeJSON[]);

    case SerializeType.BigInt:
      return BigInt(value as string);

    case SerializeType.Boolean:
      return value;

    case SerializeType.Date:
      return new Date(value as string);

    case SerializeType.Map:
      return new Map(toRawMap(value as [PropertyKey, SerializeJSON][]));

    case SerializeType.Null:
      return null;

    case SerializeType.Number:
      return value;

    case SerializeType.Object:
      return toRawObject(value as Record<PropertyKey, SerializeJSON>);

    case SerializeType.RegExp:
      return new RegExp((value as { source: string; flags: string }).source, (value as { source: string; flags: string }).flags);

    case SerializeType.Set:
      return new Set(toRawArray(value as SerializeJSON[]));

    case SerializeType.String:
      return value;

    case SerializeType.Undefined:
      return undefined;

    default:
      throw new TypeError('Serialize received an unknown type');
  }
}

function toRawArray(json: SerializeJSON[]): unknown[] {
  return json.reduce<unknown[]>((raw, value) => [...raw, toRaw(value)], []);
}

function toRawMap(json: [PropertyKey, SerializeJSON][]): [PropertyKey, unknown][] {
  return json.reduce<[PropertyKey, unknown][]>((raw, [key, value]) => [...raw, [key, toRaw(value)]], []);
}

function toRawObject(json: Record<PropertyKey, SerializeJSON>): Record<PropertyKey, unknown> {
  return Object.entries(json).reduce<Record<PropertyKey, unknown>>((raw, [key, value]) => ({ ...raw, [key]: toRaw(value) }), {});
}
