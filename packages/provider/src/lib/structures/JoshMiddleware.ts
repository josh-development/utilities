import type { Awaitable, PartialRequired } from '@sapphire/utilities';
import { resolveCommonIdentifier } from '../functions';
import { Method, Payload, Trigger, type Semver } from '../types';
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

export abstract class JoshMiddleware<ContextData extends JoshMiddleware.Context, StoredValue = unknown> {
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

  /**
   * Data migrations for this middleware.
   * @since 1.0.0
   */
  public readonly migrations: JoshMiddleware.Migration<StoredValue>[] = [];

  /**
   * The context data for this JoshMiddleware.
   * @since 1.0.0
   */
  protected context: ContextData;

  public constructor(context: ContextData, options: Partial<JoshMiddleware.Options> = {}) {
    this.context = context;

    const { name, conditions } = options;

    if (!name) {
      throw this.error(JoshMiddleware.CommonIdentifiers.NameNotFound);
    }

    this.name = name;
    this.conditions = conditions ?? { [Trigger.PreProvider]: [], [Trigger.PostProvider]: [] };
  }

  /**
   * The semver version of this provider.
   * @since 1.0.0
   */
  public abstract get version(): Semver;

  /**
   * The provider that is used with the current Josh.
   * @since 1.0.0
   */
  protected get provider(): JoshProvider<StoredValue> {
    if (this.store === undefined) {
      throw this.error(JoshMiddleware.CommonIdentifiers.StoreNotFound);
    }

    return this.store.provider;
  }

  /**
   * Initiates this class with it's store.
   * @since 1.0.0
   * @param store The store to set to `this`.
   * @returns Returns the current JoshMiddleware class.
   */
  public async init(store: JoshMiddlewareStore<StoredValue>): Promise<this> {
    this.store = store;

    const version = await this.fetchVersion(this.context, store);

    if (version.major < this.version.major) {
      const { allowMigrations } = this.context;

      if (!allowMigrations) {
        throw this.error(JoshMiddleware.CommonIdentifiers.NeedsMigration);
      }

      const migration = this.migrations.find(
        (migration) =>
          migration.version.major === version.major && migration.version.minor <= version.minor && migration.version.patch <= version.patch
      );

      if (migration === undefined) {
        throw this.error(JoshMiddleware.CommonIdentifiers.MigrationNotFound, { version });
      }

      const { major, minor, patch } = version;

      console.log(`[${this.constructor.name}]: Running migration for ${major}.${minor}.${patch}`);

      await migration.run(this.context, store);

      console.log(
        `[${this.constructor.name}]: Migration for version ${major}.${minor}.${patch} ran successfully. This middleware is now up-to-date with the latest version (${this.version.major}.${this.version.minor}.${this.version.patch})`
      );
    }

    return this;
  }

  public [Method.AutoKey](payload: Payload.AutoKey): Awaitable<Payload.AutoKey> {
    return payload;
  }

  public [Method.Clear](payload: Payload.Clear): Awaitable<Payload.Clear> {
    return payload;
  }

  public [Method.Dec](payload: Payload.Dec): Awaitable<Payload.Dec> {
    return payload;
  }

  public [Method.Delete](payload: Payload.Delete): Awaitable<Payload.Delete> {
    return payload;
  }

  public [Method.DeleteMany](payload: Payload.DeleteMany): Awaitable<Payload.DeleteMany> {
    return payload;
  }

  public [Method.Each](payload: Payload.Each<StoredValue>): Awaitable<Payload.Each<StoredValue>> {
    return payload;
  }

  public [Method.Ensure](payload: Payload.Ensure<StoredValue>): Awaitable<Payload.Ensure<StoredValue>> {
    return payload;
  }

  public [Method.Entries](payload: Payload.Entries<StoredValue>): Awaitable<Payload.Entries<StoredValue>> {
    return payload;
  }

  public [Method.Every]<StoredValue>(payload: Payload.Every.ByHook<StoredValue>): Awaitable<Payload.Every.ByHook<StoredValue>>;
  public [Method.Every](payload: Payload.Every.ByValue): Awaitable<Payload.Every.ByValue>;
  public [Method.Every]<StoredValue>(payload: Payload.Every<StoredValue>): Awaitable<Payload.Every<StoredValue>>;
  public [Method.Every]<StoredValue>(payload: Payload.Every<StoredValue>): Awaitable<Payload.Every<StoredValue>> {
    return payload;
  }

  public [Method.Filter](payload: Payload.Filter.ByHook<StoredValue>): Awaitable<Payload.Filter.ByHook<StoredValue>>;
  public [Method.Filter](payload: Payload.Filter.ByValue<StoredValue>): Awaitable<Payload.Filter.ByValue<StoredValue>>;
  public [Method.Filter](payload: Payload.Filter<StoredValue>): Awaitable<Payload.Filter<StoredValue>>;
  public [Method.Filter](payload: Payload.Filter<StoredValue>): Awaitable<Payload.Filter<StoredValue>> {
    return payload;
  }

  public [Method.Find](payload: Payload.Find.ByHook<StoredValue>): Awaitable<Payload.Find.ByHook<StoredValue>>;
  public [Method.Find](payload: Payload.Find.ByValue<StoredValue>): Awaitable<Payload.Find.ByValue<StoredValue>>;
  public [Method.Find](payload: Payload.Find<StoredValue>): Awaitable<Payload.Find<StoredValue>>;
  public [Method.Find](payload: Payload.Find<StoredValue>): Awaitable<Payload.Find<StoredValue>> {
    return payload;
  }

  public [Method.Get]<Value>(payload: Payload.Get<Value>): Awaitable<Payload.Get<Value>> {
    return payload;
  }

  public [Method.GetMany](payload: Payload.GetMany<StoredValue>): Awaitable<Payload.GetMany<StoredValue>> {
    return payload;
  }

  public [Method.Has](payload: Payload.Has): Awaitable<Payload.Has> {
    return payload;
  }

  public [Method.Inc](payload: Payload.Inc): Awaitable<Payload.Inc> {
    return payload;
  }

  public [Method.Keys](payload: Payload.Keys): Awaitable<Payload.Keys> {
    return payload;
  }

  public [Method.Map]<Value = StoredValue>(payload: Payload.Map.ByHook<StoredValue, Value>): Awaitable<Payload.Map.ByHook<StoredValue, Value>>;
  public [Method.Map]<Value>(payload: Payload.Map.ByPath<Value>): Awaitable<Payload.Map.ByPath<Value>>;
  public [Method.Map]<Value = StoredValue>(payload: Payload.Map<StoredValue, Value>): Awaitable<Payload.Map<StoredValue, Value>>;
  public [Method.Map]<Value = StoredValue>(payload: Payload.Map<StoredValue, Value>): Awaitable<Payload.Map<StoredValue, Value>> {
    return payload;
  }

  public [Method.Math](payload: Payload.Math): Awaitable<Payload.Math> {
    return payload;
  }

  public [Method.Partition](payload: Payload.Partition.ByHook<StoredValue>): Awaitable<Payload.Partition.ByHook<StoredValue>>;
  public [Method.Partition](payload: Payload.Partition.ByValue<StoredValue>): Awaitable<Payload.Partition.ByValue<StoredValue>>;
  public [Method.Partition](payload: Payload.Partition<StoredValue>): Awaitable<Payload.Partition<StoredValue>>;
  public [Method.Partition](payload: Payload.Partition<StoredValue>): Awaitable<Payload.Partition<StoredValue>> {
    return payload;
  }

  public [Method.Push]<Value>(payload: Payload.Push<Value>): Awaitable<Payload.Push<Value>> {
    return payload;
  }

  public [Method.Random](payload: Payload.Random<StoredValue>): Awaitable<Payload.Random<StoredValue>> {
    return payload;
  }

  public [Method.RandomKey](payload: Payload.RandomKey): Awaitable<Payload.RandomKey> {
    return payload;
  }

  public [Method.Remove]<StoredValue>(payload: Payload.Remove.ByHook<StoredValue>): Awaitable<Payload.Remove.ByHook<StoredValue>>;
  public [Method.Remove](payload: Payload.Remove.ByValue): Awaitable<Payload.Remove.ByValue>;
  public [Method.Remove]<StoredValue>(payload: Payload.Remove<StoredValue>): Awaitable<Payload.Remove<StoredValue>>;
  public [Method.Remove]<StoredValue>(payload: Payload.Remove<StoredValue>): Awaitable<Payload.Remove<StoredValue>> {
    return payload;
  }

  public [Method.Set]<Value>(payload: Payload.Set<Value>): Awaitable<Payload.Set<Value>> {
    return payload;
  }

  public [Method.SetMany](payload: Payload.SetMany): Awaitable<Payload.SetMany> {
    return payload;
  }

  public [Method.Size](payload: Payload.Size): Awaitable<Payload.Size> {
    return payload;
  }

  public [Method.Some]<StoredValue>(payload: Payload.Some.ByHook<StoredValue>): Awaitable<Payload.Some.ByHook<StoredValue>>;
  public [Method.Some]<Value>(payload: Payload.Some.ByValue): Awaitable<Payload.Some.ByValue>;
  public [Method.Some]<StoredValue>(payload: Payload.Some<StoredValue>): Awaitable<Payload.Some<StoredValue>>;
  public [Method.Some]<StoredValue>(payload: Payload.Some<StoredValue>): Awaitable<Payload.Some<StoredValue>> {
    return payload;
  }

  public [Method.Update]<Value = StoredValue>(payload: Payload.Update<StoredValue, Value>): Awaitable<Payload.Update<StoredValue, Value>> {
    return payload;
  }

  public [Method.Values](payload: Payload.Values<StoredValue>): Awaitable<Payload.Values<StoredValue>> {
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
  public toJSON(): JoshMiddleware.Json {
    return { name: this.name, conditions: this.conditions };
  }

  /**
   * Creates an instance of `JoshProviderError` with the given options.
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
   * Resolves an identifier to a string.
   * @since 1.0.0
   * @param identifier The identifier to resolve.
   * @param metadata The metadata for the identifier.
   * @returns The resolved identifier message.
   */
  protected resolveIdentifier(identifier: string, metadata: Record<string, unknown> = {}): string {
    const result = resolveCommonIdentifier(identifier, metadata);

    if (result !== null) {
      return result;
    }

    switch (identifier) {
      case JoshMiddleware.CommonIdentifiers.MigrationNotFound: {
        const { version } = metadata;
        const { major, minor, patch } = version as Semver;

        return `Migration not found for version ${major}.${minor}.${patch}.`;
      }

      case JoshMiddleware.CommonIdentifiers.NameNotFound:
        return 'No name was provided for this JoshMiddleware.';

      case JoshMiddleware.CommonIdentifiers.NeedsMigration:
        return `[${this.constructor.name}]: The middleware ${
          this.name?.length ? `with the name "${this.name}" ` : ''
        }needs migrations. Please set the "allowMigrations" option to true to run migrations automatically.`;

      case JoshMiddleware.CommonIdentifiers.StoreNotFound:
        return 'The "store" property is undefined. This usually means this JoshMiddleware has not been initiated.';
    }

    throw new Error(`'${this.constructor.name}#resolveIdentifier()' received an unknown identifier: '${identifier}'`);
  }

  protected abstract fetchVersion(context: JoshMiddleware.Context, store: JoshMiddlewareStore<StoredValue>): Awaitable<Semver>;
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

    /**
     * The migrations for this JoshMiddleware.
     * @since 1.0.0
     */
    migrations?: Migration;
  }

  /**
   * The context data for {@link JoshMiddleware}
   * @since 1.0.0
   */
  export interface Context {
    /**
     * Whether to allow automatic middleware data migrations.
     */
    allowMigrations?: boolean;
  }

  /**
   * The conditions to run this JoshMiddleware on.
   * @since 1.0.0
   */
  export interface Conditions {
    /**
     * The {@link Trigger.PreProvider} method conditions to run at.
     * @since 1.0.0
     */
    [Trigger.PreProvider]: Method[];

    /**
     * The `{@link Trigger.PostProvider} method conditions to run at.
     * @since 1.0.0
     */
    [Trigger.PostProvider]: Method[];
  }

  /**
   * A migration for the {@link JoshMiddleware} instance.
   * @since 1.0.0
   */
  export interface Migration<StoredValue = unknown> {
    /**
     * The version this migration is for.
     * @since 1.0.0
     */
    version: Semver;

    /**
     * The method to run when the current version of the middleware matches it.
     * @since 1.0.0
     * @param store The store for the middleware to the migration.
     */
    run(context: Context, store: JoshMiddlewareStore<StoredValue>): Awaitable<void>;
  }

  /**
   * The options in an object for {@link JoshMiddleware}
   * @since 1.0.0
   */
  export interface Json {
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
    MigrationNotFound = 'MigrationNotFound',

    NameNotFound = 'nameNotFound',

    NeedsMigration = 'needsMigration',

    StoreNotFound = 'storeNotFound'
  }
}
