import type { Awaitable, NonNullObject, PartialRequired } from '@sapphire/utilities';
import { resolveCommonIdentifier } from '../functions';
import { Method, Payload, Payloads } from '../types';
import type { JoshMiddlewareStore } from './JoshMiddlewareStore';
import type { JoshProvider } from './JoshProvider';
import { JoshProviderError } from './JoshProviderError';

/**
 * The base class for creating middlewares. Extend this class to create a JoshMiddleware.
 * @see {@link JoshMiddleware.Options} for all available options for middlewares.
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * (at)ApplyOptions<JoshMiddleware.Options>({
 *   name: 'JoshMiddleware',
 *   // More options...
 * })
 * export class CoreMiddleware extends JoshMiddleware {
 *   // Make method implementations...
 * }
 * ```
 *
 * @example
 * ```typescript
 * export class CoreMiddleware extends JoshMiddleware {
 *   public constructor() {
 *     super({
 *       name: 'JoshMiddleware'
 *     })
 *   }
 * }
 * ```
 */

export class JoshMiddleware<ContextData extends NonNullObject, StoredValue = unknown> {
  /**
   * The store for this JoshMiddleware.
   * @since 1.0.0
   */
  public store?: JoshMiddlewareStore<StoredValue>;

  /**
   * The name of this JoshMiddleware.
   * @since 1.0.0
   */
  public name: string;

  /**
   * The conditions this JoshMiddleware to run.
   * @since 1.0.0
   */
  public readonly conditions: JoshMiddleware.Conditions;

  protected context: ContextData;

  public constructor(context: ContextData, options: Partial<JoshMiddleware.Options> = {}) {
    this.context = context;

    const { name, conditions } = options;

    if (!name) throw this.error(JoshMiddleware.CommonIdentifiers.NameNotFound);

    this.name = name;
    this.conditions = conditions ?? { pre: [], post: [] };
  }

  /**
   * The provider that is used with the current Josh.
   * @since 1.0.0
   */
  protected get provider(): JoshProvider<StoredValue> {
    if (this.store === undefined) throw this.error(JoshMiddleware.CommonIdentifiers.StoreNotFound);

    return this.store.provider;
  }

  /**
   * Initiates this class with it's store.
   * @since 1.0.0
   * @param store The store to set to `this`.
   * @returns Returns the current JoshMiddleware class.
   */
  public init(store: JoshMiddlewareStore<StoredValue>): Awaitable<this> {
    this.store = store;

    return this;
  }

  public [Method.AutoKey](payload: Payloads.AutoKey): Awaitable<Payloads.AutoKey> {
    return payload;
  }

  public [Method.Clear](payload: Payloads.Clear): Awaitable<Payloads.Clear> {
    return payload;
  }

  public [Method.Dec](payload: Payloads.Dec): Awaitable<Payloads.Dec> {
    return payload;
  }

  public [Method.Delete](payload: Payloads.Delete): Awaitable<Payloads.Delete> {
    return payload;
  }

  public [Method.DeleteMany](payload: Payloads.DeleteMany): Awaitable<Payloads.DeleteMany> {
    return payload;
  }

  public [Method.Each](payload: Payloads.Each<StoredValue>): Awaitable<Payloads.Each<StoredValue>> {
    return payload;
  }

  public [Method.Ensure](payload: Payloads.Ensure<StoredValue>): Awaitable<Payloads.Ensure<StoredValue>> {
    return payload;
  }

  public [Method.Entries](payload: Payloads.Entries<StoredValue>): Awaitable<Payloads.Entries<StoredValue>> {
    return payload;
  }

  public [Method.Every]<StoredValue>(payload: Payloads.Every.ByHook<StoredValue>): Awaitable<Payloads.Every.ByHook<StoredValue>>;
  public [Method.Every](payload: Payloads.Every.ByValue): Awaitable<Payloads.Every.ByValue>;
  public [Method.Every]<StoredValue>(payload: Payloads.Every<StoredValue>): Awaitable<Payloads.Every<StoredValue>>;
  public [Method.Every]<StoredValue>(payload: Payloads.Every<StoredValue>): Awaitable<Payloads.Every<StoredValue>> {
    return payload;
  }

  public [Method.Filter](payload: Payloads.Filter.ByHook<StoredValue>): Awaitable<Payloads.Filter.ByHook<StoredValue>>;
  public [Method.Filter](payload: Payloads.Filter.ByValue<StoredValue>): Awaitable<Payloads.Filter.ByValue<StoredValue>>;
  public [Method.Filter](payload: Payloads.Filter<StoredValue>): Awaitable<Payloads.Filter<StoredValue>>;
  public [Method.Filter](payload: Payloads.Filter<StoredValue>): Awaitable<Payloads.Filter<StoredValue>> {
    return payload;
  }

  public [Method.Find](payload: Payloads.Find.ByHook<StoredValue>): Awaitable<Payloads.Find.ByHook<StoredValue>>;
  public [Method.Find](payload: Payloads.Find.ByValue<StoredValue>): Awaitable<Payloads.Find.ByValue<StoredValue>>;
  public [Method.Find](payload: Payloads.Find<StoredValue>): Awaitable<Payloads.Find<StoredValue>>;
  public [Method.Find](payload: Payloads.Find<StoredValue>): Awaitable<Payloads.Find<StoredValue>> {
    return payload;
  }

  public [Method.Get]<Value>(payload: Payloads.Get<Value>): Awaitable<Payloads.Get<Value>> {
    return payload;
  }

  public [Method.GetMany](payload: Payloads.GetMany<StoredValue>): Awaitable<Payloads.GetMany<StoredValue>> {
    return payload;
  }

  public [Method.Has](payload: Payloads.Has): Awaitable<Payloads.Has> {
    return payload;
  }

  public [Method.Inc](payload: Payloads.Inc): Awaitable<Payloads.Inc> {
    return payload;
  }

  public [Method.Keys](payload: Payloads.Keys): Awaitable<Payloads.Keys> {
    return payload;
  }

  public [Method.Map]<Value = StoredValue>(payload: Payloads.Map.ByHook<StoredValue, Value>): Awaitable<Payloads.Map.ByHook<StoredValue, Value>>;
  public [Method.Map]<Value>(payload: Payloads.Map.ByPath<Value>): Awaitable<Payloads.Map.ByPath<Value>>;
  public [Method.Map]<Value = StoredValue>(payload: Payloads.Map<StoredValue, Value>): Awaitable<Payloads.Map<StoredValue, Value>>;
  public [Method.Map]<Value = StoredValue>(payload: Payloads.Map<StoredValue, Value>): Awaitable<Payloads.Map<StoredValue, Value>> {
    return payload;
  }

  public [Method.Math](payload: Payloads.Math): Awaitable<Payloads.Math> {
    return payload;
  }

  public [Method.Partition](payload: Payloads.Partition.ByHook<StoredValue>): Awaitable<Payloads.Partition.ByHook<StoredValue>>;
  public [Method.Partition](payload: Payloads.Partition.ByValue<StoredValue>): Awaitable<Payloads.Partition.ByValue<StoredValue>>;
  public [Method.Partition](payload: Payloads.Partition<StoredValue>): Awaitable<Payloads.Partition<StoredValue>>;
  public [Method.Partition](payload: Payloads.Partition<StoredValue>): Awaitable<Payloads.Partition<StoredValue>> {
    return payload;
  }

  public [Method.Push]<Value>(payload: Payloads.Push<Value>): Awaitable<Payloads.Push<Value>> {
    return payload;
  }

  public [Method.Random](payload: Payloads.Random<StoredValue>): Awaitable<Payloads.Random<StoredValue>> {
    return payload;
  }

  public [Method.RandomKey](payload: Payloads.RandomKey): Awaitable<Payloads.RandomKey> {
    return payload;
  }

  public [Method.Remove]<StoredValue>(payload: Payloads.Remove.ByHook<StoredValue>): Awaitable<Payloads.Remove.ByHook<StoredValue>>;
  public [Method.Remove](payload: Payloads.Remove.ByValue): Awaitable<Payloads.Remove.ByValue>;
  public [Method.Remove]<StoredValue>(payload: Payloads.Remove<StoredValue>): Awaitable<Payloads.Remove<StoredValue>>;
  public [Method.Remove]<StoredValue>(payload: Payloads.Remove<StoredValue>): Awaitable<Payloads.Remove<StoredValue>> {
    return payload;
  }

  public [Method.Set]<Value>(payload: Payloads.Set<Value>): Awaitable<Payloads.Set<Value>> {
    return payload;
  }

  public [Method.SetMany](payload: Payloads.SetMany): Awaitable<Payloads.SetMany> {
    return payload;
  }

  public [Method.Size](payload: Payloads.Size): Awaitable<Payloads.Size> {
    return payload;
  }

  public [Method.Some]<StoredValue>(payload: Payloads.Some.ByHook<StoredValue>): Awaitable<Payloads.Some.ByHook<StoredValue>>;
  public [Method.Some]<Value>(payload: Payloads.Some.ByValue): Awaitable<Payloads.Some.ByValue>;
  public [Method.Some]<StoredValue>(payload: Payloads.Some<StoredValue>): Awaitable<Payloads.Some<StoredValue>>;
  public [Method.Some]<StoredValue>(payload: Payloads.Some<StoredValue>): Awaitable<Payloads.Some<StoredValue>> {
    return payload;
  }

  public [Method.Update]<Value = StoredValue>(payload: Payloads.Update<StoredValue, Value>): Awaitable<Payloads.Update<StoredValue, Value>> {
    return payload;
  }

  public [Method.Values](payload: Payloads.Values<StoredValue>): Awaitable<Payloads.Values<StoredValue>> {
    return payload;
  }

  public run<P extends Payload>(payload: P): Awaitable<P> {
    return payload;
  }

  /**
   * Adds the options of this class to an object.
   * @since 1.0.0
   * @returns The options for this JoshMiddleware as an object.
   */
  public toJSON(): JoshMiddleware.JSON {
    return { name: this.name, conditions: this.conditions };
  }

  /**
   * Creates an Josh provider error.
   * @since 1.0.0
   * @param options The options for the error.
   * @returns The error.
   */
  protected error(
    options: string | PartialRequired<JoshProviderError.Options, 'identifier'>,
    metadata: Record<string, unknown> = {}
  ): JoshProviderError {
    if (typeof options === 'string') {
      return new JoshProviderError({
        identifier: options,
        origin: { type: JoshProviderError.OriginType.Middleware, name: this.constructor.name.replace(/Middleware/, '') },
        message: this.resolveIdentifier(options, metadata)
      });
    }

    return new JoshProviderError({
      ...options,
      name: options.name ?? `${this.constructor.name}Error`,
      origin: { type: JoshProviderError.OriginType.Middleware, name: this.constructor.name.replace(/Middleware/, '') }
    });
  }

  /**
   * Resolves an identifier.
   * @since 1.0.0
   * @param identifier The identifier to resolve.
   * @param metadata The metadata to use.
   * @returns The resolved identifier message.
   */
  protected resolveIdentifier(identifier: string, metadata: Record<string, unknown>): string {
    const result = resolveCommonIdentifier(identifier, metadata);

    if (result !== null) return result;

    switch (identifier) {
      case JoshMiddleware.CommonIdentifiers.NameNotFound:
        return 'No name was provided for this JoshMiddleware.';

      case JoshMiddleware.CommonIdentifiers.StoreNotFound:
        return 'The "store" property is undefined. This usually means this JoshMiddleware has not been initiated.';
    }

    throw new Error(`Unknown identifier: ${identifier}`);
  }
}

export namespace JoshMiddleware {
  /**
   * The options for {@link JoshMiddleware}
   * @since 1.0.0
   */
  export interface Options {
    /**
     * The name of this JoshMiddleware.
     * @since 1.0.0
     */
    name: string;

    /**
     * The conditions for this JoshMiddleware to run on.
     * @since 1.0.0
     */
    conditions: Conditions;
  }

  /**
   * The conditions to run this JoshMiddleware on.
   * @since 1.0.0
   */
  export interface Conditions {
    /**
     * The `pre` provider method conditions to run at.
     * @since 1.0.0
     */
    pre: Method[];

    /**
     * The `post` provider method conditions to run at.
     * @since 1.0.0
     */
    post: Method[];
  }

  /**
   * The options in an object for {@link JoshMiddleware}
   * @since 1.0.0
   */
  export interface JSON {
    /**
     * The name of this JoshMiddleware.
     * @since 1.0.0
     */
    name: string;

    /**
     * The conditions for this JoshMiddleware.
     * @since 1.0.0
     */
    conditions: Conditions;
  }

  export enum CommonIdentifiers {
    NameNotFound = 'nameNotFound',

    StoreNotFound = 'storeNotFound'
  }
}