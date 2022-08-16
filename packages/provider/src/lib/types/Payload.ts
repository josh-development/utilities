import type { Awaitable } from '@sapphire/utilities';
import type { JoshProviderError } from '../structures/JoshProviderError';
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
  metadata?: Record<PropertyKey, unknown>;

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
   * The key/path extension for {@link Payload}
   * @since 1.0.0
   */
  export interface KeyPath {
    /**
     * The key for this extension.
     * @since 1.0.0
     */
    key: string;

    /**
     * The path for this extension.
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
     * The data for this extension.
     * @since 1.0.0
     */
    data?: Value;
  }

  export interface WithData<Value = unknown> extends Payload {
    /**
     * The data for this extension.
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
     * The type for this extension.
     * @since 1.0.0
     * @see Type
     */
    type: Type.Hook;

    /**
     * The hook for this extension.
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
     * The type for this extension.
     * @since 1.0.0
     * @see Type
     */
    type: Type.Value;

    /**
     * The value for this extension.
     * @since 1.0.0
     */
    value: Value;
  }

  /**
   * The value with path extension for {@link Payload}
   * @since 1.0.0
   * @see {@link ByValue}
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
     * The type for this extension.
     * @since 1.0.0
     * @see `Type`
     */
    type: Type.Path;

    /**
     * The path for this extension.
     * @since 1.0.0
     */
    path: string[];
  }

  /**
   * The Type enum for {@link Payload}
   * @since 1.0.0
   * @see {@link ByHook}
   * @see {@link ByPath}
   * @see {@link ByValue}
   */
  export enum Type {
    Hook,

    Value,

    Path
  }

  export type Hook<Value, R = unknown> = (value: Value, key: string) => Awaitable<R>;
}
