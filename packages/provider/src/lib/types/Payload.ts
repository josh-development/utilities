import type { Awaitable, Primitive } from '@sapphire/utilities';
import type { JoshProviderError } from '../structures/JoshProviderError';
import type { MathOperator } from './MathOperator';
import type { Method } from './Method';
import type { Trigger } from './Trigger';

/**
 * The base payload to use for most Josh operations.
 * @since 1.0.0
 */
export interface Payload {
  /**
   * The method this payload is for.
   * @since 1.0.0
   */
  method: Method;

  /**
   * The metadata to use for this payload.
   * @since 1.0.0
   */
  metadata?: Payload.Metadata;

  /**
   * The trigger this payload is currently for.
   * @since 1.0.0
   */
  trigger?: Trigger;

  /**
   * The errors that occurred during payload execution.
   * @since 1.0.0
   */
  errors: JoshProviderError[];
}

export namespace Payload {
  /**
   * Metadata for {@link Payload}
   * @since 1.0.0
   */
  export interface Metadata {
    skipProvider?: boolean;
  }

  /**
   * The key and path extension for {@link Payload}
   * @since 1.0.0
   */
  export interface KeyPath {
    /**
     * The key for this payload.
     * @since 1.0.0
     */
    key: string;

    /**
     * The path for this payload.
     * @since 1.0.0
     */
    path: string[];
  }

  /**
   * The data extension for {@link Payload}
   * @since 1.0.0
   */
  export interface Data<Value = unknown> {
    /**
     * The data for this payload.
     * @since 1.0.0
     */
    data?: Value;
  }

  export interface WithData<Value = unknown> extends Payload {
    /**
     * The data for this payload.
     * @since 1.0.0
     */
    data: Value;
  }

  /**
   * The hook extension for {@link Payload}
   * @since 1.0.0
   */
  export interface ByHook<T extends Hook<any, any>> {
    /**
     * The type for this payload.
     * @since 1.0.0
     */
    type: Type.Hook;

    /**
     * The hook for this payload.
     * @since 1.0.0
     */
    hook: T;
  }

  /**
   * The value extension for {@link Payload}
   * @since 1.0.0
   */
  export interface ByValue<Value> {
    /**
     * The type for this payload.
     * @since 1.0.0
     */
    type: Type.Value;

    /**
     * The value for this payload.
     * @since 1.0.0
     */
    value: Value;
  }

  /**
   * The value with path extension for {@link Payload}
   * @since 1.0.0

   */
  export interface ByValueWithPath<Value> extends ByValue<Value> {
    /**
     * A path to the value for equality check.
     * @since 1.0.0
     */
    path: string[];
  }

  /**
   * The path extension for {@link Payload}
   * @since 1.0.0
   */
  export interface ByPath {
    /**
     * The type for this payload.
     * @since 1.0.0
     */
    type: Type.Path;

    /**
     * The path for this payload.
     * @since 1.0.0
     */
    path: string[];
  }

  /**
   * The Type enum for {@link Payload}
   * @since 1.0.0
   */
  export enum Type {
    Hook,

    Value,

    Path,
  }

  /**
   * The hook type for {@link Payload}
   * @since 1.0.0
   */
  export type Hook<Value, R = unknown> = (value: Value, key: string) => Awaitable<R>;

  /**
   * The payload for {@link Method.AutoKey}
   * @since 1.0.0
   */
  export interface AutoKey extends Payload, Data<string> {
    method: Method.AutoKey;
  }

  /**
   * The payload for {@link Method.Clear}
   * @since 1.0.0
   */
  export interface Clear extends Payload {
    method: Method.Clear;
  }

  /**
   * The payload for {@link Method.Dec}
   * @since 1.0.0
   */
  export interface Dec extends Payload, KeyPath {
    method: Method.Dec;
  }

  /**
   * The payload for {@link Method.Delete}
   * @since 1.0.0
   */
  export interface Delete extends Payload, KeyPath {
    method: Method.Delete;
  }

  /**
   * The payload for {@link Method.DeleteMany}
   * @since 1.0.0
   */
  export interface DeleteMany extends Payload {
    method: Method.DeleteMany;

    /**
     * The keys to delete.
     * @since 1.0.0
     */
    keys: string[];
  }

  /**
   * The payload for {@link Method.Each}
   * @since 1.0.0
   */
  export interface Each<StoredValue> extends Payload {
    method: Method.Each;

    hook: Hook<StoredValue>;
  }

  /**
   * The payload for {@link Method.Ensure}
   * @since 1.0.0
   */
  export interface Ensure<StoredValue> extends Payload, Data<StoredValue> {
    method: Method.Ensure;

    /**
     * The key to get or set.
     * @since 1.0.0
     */
    key: string;

    /**
     * The default value to store if `Payload.Ensure#key` doesn't exist.
     * @since 1.0.0
     */
    defaultValue: StoredValue;
  }

  /**
   * The payload for {@link Method.Entries}
   * @since 1.0.0
   */
  export interface Entries<StoredValue> extends Payload, Data<Record<string, StoredValue>> {
    method: Method.Entries;
  }

  /**
   * The payload for {@link Method.Every}
   * @since 1.0.0
   */
  export type Every<StoredValue> = Every.ByHook<StoredValue> | Every.ByValue;

  export namespace Every {
    /**
     * The hook payload for {@link Method.Every}
     * @since 1.0.0
     */
    export interface ByHook<StoredValue> extends Payload, Payload.ByHook<Hook<StoredValue>>, Data<boolean> {
      method: Method.Every;
    }

    /**
     * The value payload for {@link Method.Every}
     * @since 1.0.0
     */
    export interface ByValue extends Payload, ByValueWithPath<Primitive>, Data<boolean> {
      method: Method.Every;
    }
  }

  /**
   * The payload for {@link Method.Filter}
   * @since 1.0.0
   */
  export type Filter<StoredValue> = Filter.ByHook<StoredValue> | Filter.ByValue<StoredValue>;

  export namespace Filter {
    /**
     * The hook payload for {@link Method.Filter}
     * @since 1.0.0
     */
    export interface ByHook<StoredValue> extends Payload, Payload.ByHook<Hook<StoredValue>>, Data<Record<string, StoredValue>> {
      method: Method.Filter;
    }

    /**
     * The value payload for {@link Method.Filter}
     * @since 1.0.0
     */
    export interface ByValue<StoredValue> extends Payload, ByValueWithPath<Primitive>, Data<Record<string, StoredValue>> {
      method: Method.Filter;
    }
  }

  /**
   * The payload for {@link Method.Find}
   * @since 1.0.0


   */
  export type Find<StoredValue> = Find.ByHook<StoredValue> | Find.ByValue<StoredValue>;

  export namespace Find {
    /**
     * The hook payload for {@link Method.Find}
     * @since 1.0.0
     */
    export interface ByHook<StoredValue> extends Payload, Payload.ByHook<Hook<StoredValue>>, Data<[string, StoredValue] | [null, null]> {
      method: Method.Find;
    }

    /**
     * The value payload for {@link Method.Find}
     * @since 1.0.0
     */
    export interface ByValue<StoredValue> extends Payload, ByValueWithPath<Primitive>, Data<[string, StoredValue] | [null, null]> {
      method: Method.Find;
    }
  }

  /**
   * The payload for {@link Method.Get}
   * @since 1.0.0
   */
  export interface Get<StoredValue> extends Payload, KeyPath, Data<StoredValue> {
    method: Method.Get;
  }

  /**
   * The payload for {@link Method.GetMany}
   * @since 1.0.0
   */
  export interface GetMany<StoredValue> extends Payload, Data<Record<string, StoredValue | null>> {
    method: Method.GetMany;

    /**
     * The keys for this payload.
     * @since 1.0.0
     */
    keys: string[];
  }

  /**
   * The payload for {@link Method.Has}
   * @since 1.0.0
   */
  export interface Has extends Payload, KeyPath, Data<boolean> {
    method: Method.Has;
  }

  /**
   * The payload for {@link Method.Inc}
   * @since 1.0.0
   */
  export interface Inc extends Payload, KeyPath {
    method: Method.Inc;
  }

  /**
   * The payload for {@link Method.Keys}
   * @since 1.0.0
   */
  export interface Keys extends Payload, Data<string[]> {
    method: Method.Keys;
  }

  /**
   * The payload for {@link Method.Map}
   * @since 1.0.0
   */
  export type Map<Value, ReturnValue> = Map.ByHook<Value, ReturnValue> | Map.ByPath<ReturnValue>;

  export namespace Map {
    /**
     * The hook payload for {@link Method.Map}
     * @since 1.0.0
     */
    export interface ByHook<Value, ReturnValue> extends Payload, Payload.ByHook<Hook<Value, ReturnValue>>, Data<ReturnValue[]> {
      method: Method.Map;

      type: Type.Hook;
    }

    /**
     * The path payload for {@link Method.Map}
     * @since 1.0.0
     */
    export interface ByPath<ReturnValue> extends Payload, Payload.ByPath, Data<ReturnValue[]> {
      method: Method.Map;

      type: Type.Path;

      /**
       * The path to map stored values by.
       * @since 1.0.0
       */
      path: string[];
    }
  }

  /**
   * The payload for {@link Method.Math}
   * @since 1.0.0
   */
  export interface Math extends Payload, KeyPath {
    method: Method.Math;

    /**
     * The operator to apply to the operand.
     * @since 1.0.0
     */
    operator: MathOperator;

    /**
     * The operand to apply the operator to.
     * @since 1.0.0
     */
    operand: number;
  }

  /**
   * The payload for {@link Method.Partition}
   * @since 1.0.0


   */
  export type Partition<StoredValue> = Partition.ByHook<StoredValue> | Partition.ByValue<StoredValue>;

  export namespace Partition {
    /**
     * The hook payload for {@link Method.Partition}
     * @since 1.0.0
     */
    export interface ByHook<StoredValue> extends Payload, Payload.ByHook<Hook<StoredValue>>, Payload.Data<Data<StoredValue>> {
      method: Method.Partition;
    }

    /**
     * The value payload for {@link Method.Partition}
     * @since 1.0.0
     */
    export interface ByValue<StoredValue> extends Payload, ByValueWithPath<Primitive>, Payload.Data<Data<StoredValue>> {
      method: Method.Partition;
    }

    /**
     * The data for {@link Method.Partition}
     * @since 1.0.0
     */
    export interface Data<StoredValue> {
      /**
       * The truthy entries.
       * @since 1.0.0
       */
      truthy: Record<string, StoredValue>;

      /**
       * The falsy entries.
       * @since 1.0.0
       */
      falsy: Record<string, StoredValue>;
    }
  }

  /**
   * The payload for {@link Method.Push}
   * @since 1.0.0
   */
  export interface Push<Value> extends Payload, KeyPath {
    method: Method.Push;

    /**
     * The value to push to an array.
     * @since 1.0.0
     */
    value: Value;
  }

  /**
   * The payload for {@link Method.Random}
   * @since 1.0.0
   */
  export interface Random<StoredValue> extends Payload, Data<StoredValue[]> {
    method: Method.Random;

    /**
     * The amount of random values to get.
     * @since 1.0.0
     */
    count: number;

    /**
     * Whether values must be unique or not.
     * @since 1.0.0
     */
    unique: boolean;
  }

  /**
   * The payload for {@link Method.RandomKey}
   * @since 1.0.0
   */
  export interface RandomKey extends Payload, Data<string[]> {
    method: Method.RandomKey;

    /**
     * The amount of random keys to get.
     * @since 1.0.0
     */
    count: number;

    /**
     * Whether keys must be unique or not.
     * @since 1.0.0
     */
    unique: boolean;
  }

  /**
   * The payload for {@link Method.Remove}
   * @since 1.0.0


   */
  export type Remove<Value> = Remove.ByHook<Value> | Remove.ByValue;

  export namespace Remove {
    /**
     * The hook payload for {@link Method.Remove}
     * @since 1.0.0
     */
    export interface ByHook<Value> extends Payload, KeyPath, Payload.ByHook<Hook<Value, boolean>> {
      method: Method.Remove;

      type: Type.Hook;
    }

    /**
     * The value payload for {@link Method.Remove}
     * @since 1.0.0
     */
    export interface ByValue extends Payload, KeyPath, Payload.ByValue<Primitive> {
      method: Method.Remove;

      type: Type.Value;
    }
  }

  /**
   * The payload for {@link Method.Set}
   * @since 1.0.0
   */
  export interface Set<Value> extends Payload, KeyPath {
    method: Method.Set;

    /**
     * The value to set.
     * @since 1.0.0
     */
    value: Value;
  }

  /**
   * The payload for {@link Method.SetMany}
   * @since 1.0.0
   */
  export interface SetMany extends Payload {
    method: Method.SetMany;

    /**
     * Whether to overwrite existing entries.
     * @since 1.0.0
     */
    overwrite: boolean;

    /**
     * The entries to set.
     * @since 1.0.0
     */
    entries: SetMany.KeyPathValue[];
  }

  export namespace SetMany {
    export interface KeyPathValue extends KeyPath {
      value: unknown;
    }
  }

  /**
   * The payload for {@link Method.Size}
   * @since 1.0.0
   */
  export interface Size extends Payload, Data<number> {
    method: Method.Size;
  }

  /**
   * The payload for {@link Method.Some}
   * @since 1.0.0
   */
  export type Some<Value> = Some.ByHook<Value> | Some.ByValue;

  export namespace Some {
    /**
     * The hook payload for {@link Method.Some}
     * @since 1.0.0
     */
    export interface ByHook<Value> extends Payload, Payload.ByHook<Hook<Value, boolean>>, Data<boolean> {
      method: Method.Some;
    }

    /**
     * The value payload for {@link Method.Some}
     * @since 1.0.0
     */
    export interface ByValue extends Payload, ByValueWithPath<Primitive>, Data<boolean> {
      method: Method.Some;
    }
  }

  /**
   * The payload for {@link Method.Update}
   * @since 1.0.0
   */
  export interface Update<Value, ReturnValue> extends Payload {
    method: Method.Update;

    /**
     * The key to the value to update.
     * @since 1.0.0
     */
    key: string;

    /**
     * The hook to update stored value.
     * @since 1.0.0
     */
    hook: Hook<Value, ReturnValue>;
  }

  /**
   * The payload for {@link Method.Values}
   * @since 1.0.0
   */
  export interface Values<StoredValue> extends Payload, Data<StoredValue[]> {
    method: Method.Values;
  }
}
