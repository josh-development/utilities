import type { Awaitable, PartialRequired } from '@sapphire/utilities';
import { resolveCommonIdentifier } from '../functions';
import type { Method, Payload, Semver } from '../types';
import { JoshProviderError } from './JoshProviderError';

/**
 * The base provider class. Extend this class to create your own provider.
 *
 * @since 1.0.0
 * @see {@link JoshProvider.Options} for all options available to the JoshProvider class.
 * @example
 * ```typescript
 * export class Provider<StoredValue = unknown> extends JoshProvider<StoredValue> {
 *   // Implement methods...
 * }
 * ```
 */
export abstract class JoshProvider<StoredValue = unknown> {
  /**
   * The name for this provider.
   * @since 1.0.0
   */
  public name?: string;

  /**
   * The options for this provider.
   * @since 1.0.0
   */
  public options: JoshProvider.Options;

  /**
   * Data migrations for this provider.
   * @since 1.0.0
   */
  public abstract migrations: JoshProvider.Migration[];

  public constructor(options: JoshProvider.Options = {}) {
    this.options = options;
  }

  /**
   * The semver version of this provider.
   * @since 1.0.0
   */
  public abstract get version(): Semver;

  /**
   * Initialize the provider.
   * @since 1.0.0
   * @param context The provider's context sent by this provider's Josh instance.
   * @returns The provider's context.
   *
   * @example
   * ```typescript
   * public async init(context: JoshProvider.Context): Promise<JoshProvider.Context> {
   *   // Initialize provider...
   *   context = await super.init(context);
   *   // Initialize provider...
   *   return context;
   * }
   * ```
   */
  public async init(context: JoshProvider.Context): Promise<JoshProvider.Context> {
    const { name } = context;

    this.name = name;

    const version = await this.fetchVersion(context);

    if (
      version.major < this.version.major ||
      (version.major === this.version.major && version.minor < this.version.minor) ||
      (version.major === this.version.major && version.minor === this.version.minor && version.patch < this.version.patch)
    ) {
      const { allowMigrations } = this.options;

      if (!allowMigrations) {
        throw this.error(JoshProvider.CommonIdentifiers.NeedsMigration);
      }

      const migration = this.migrations.find(
        (migration) =>
          migration.version.major === version.major && migration.version.minor <= version.minor && migration.version.patch <= version.patch
      );

      if (migration === undefined) {
        throw this.error(JoshProvider.CommonIdentifiers.MigrationNotFound, { version });
      }

      const { major, minor, patch } = version;

      console.log(`[${this.constructor.name}]: Running migration for version ${major}.${minor}.${patch}`);

      await migration.run(context);

      console.log(
        `[${this.constructor.name}]: Migration for version ${major}.${minor}.${patch} ran successfully. This provider is now up-to-date with the latest version (${this.version.major}.${this.version.minor}.${this.version.patch})`
      );
    }

    return context;
  }

  public abstract deleteMetadata(key: string): Awaitable<void>;

  public abstract getMetadata(key: string): Awaitable<unknown>;

  public abstract setMetadata(key: string, value: unknown): Awaitable<void>;

  /**
   * A method which generates a unique automatic key. This key must be unique and cannot overlap other keys.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.AutoKey](payload: Payload.AutoKey): Awaitable<Payload.AutoKey>;

  /**
   * A method which clears all entries.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Clear](payload: Payload.Clear): Awaitable<Payload.Clear>;

  /**
   * Decrements an entry or a path in an entry by one.
   *
   * An error should be pushed to the payload and immediately return, if any of the following occurs:
   * - The key and/or path does not exist - `CommonIdentifiers.MissingData`
   * - The data is not an integer - `CommonIdentifiers.InvalidDataType``
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Dec](payload: Payload.Dec): Awaitable<Payload.Dec>;

  /**
   * Deletes either the entry itself or a path in an entry.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Delete](payload: Payload.Delete): Awaitable<Payload.Delete>;

  /**
   * Deletes multiple entries and/or a path in an entry.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.DeleteMany](payload: Payload.DeleteMany): Awaitable<Payload.DeleteMany>;

  /**
   * A method which mimics the functionality of [Array#forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), except this supports asynchronous functions.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Each](payload: Payload.Each<StoredValue>): Awaitable<Payload.Each<StoredValue>>;

  /**
   * A method which ensures an entry exists.
   *
   * If the key exists, returns the value.
   * If the key does not exist, creates and returns the default value.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Ensure](payload: Payload.Ensure<StoredValue>): Awaitable<Payload.Ensure<StoredValue>>;

  /**
   * A method which mimics the functionality of [Map#entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries), except returns a record of key-value pairs.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Entries](payload: Payload.Entries<StoredValue>): Awaitable<Payload.Entries<StoredValue>>;

  /**
   * A method which mimics the functionality of [Array#each(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)], except this supports asynchronous functions.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Every]<StoredValue>(payload: Payload.Every.ByHook<StoredValue>): Awaitable<Payload.Every.ByHook<StoredValue>>;

  /**
   * A method which mimics the functionality of [Array#each(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)], except this uses a path and a value to validate.
   *
   * An error should be pushed to the payload and immediately return, if any of the following occurs:
   * - The data at the path is not a primitive type - `CommonIdentifiers.InvalidDataType`
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Every]<Value>(payload: Payload.Every.ByValue): Awaitable<Payload.Every.ByValue>;
  public abstract [Method.Every]<StoredValue>(payload: Payload.Every<StoredValue>): Awaitable<Payload.Every<StoredValue>>;

  /**
   * A method which mimics the functionality of [Array#filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), except this supports asynchronous functions.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Filter](payload: Payload.Filter.ByHook<StoredValue>): Awaitable<Payload.Filter.ByHook<StoredValue>>;

  /**
   * A method which mimics the functionality of [Array#filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), except this uses a path and a value to validate.
   *
   * An error should be pushed to the payload and immediately return, if any of the following occurs:
   * - The data at the path is not a primitive type - `CommonIdentifiers.InvalidDataType`
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Filter](payload: Payload.Filter.ByValue<StoredValue>): Awaitable<Payload.Filter.ByValue<StoredValue>>;
  public abstract [Method.Filter](payload: Payload.Filter<StoredValue>): Awaitable<Payload.Filter<StoredValue>>;

  /**
   * A method which mimics the functionality of [Array#find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), except this supports asynchronous functions.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Find](payload: Payload.Find.ByHook<StoredValue>): Awaitable<Payload.Find.ByHook<StoredValue>>;

  /**
   * A method which mimics the functionality of [Array#find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), except this uses a path and value to validate.
   *
   * An error should be pushed to the payload and immediately return, if any of the following occurs:
   * - The data at the path is not a primitive type - `CommonIdentifiers.InvalidDataType`
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Find](payload: Payload.Find.ByValue<StoredValue>): Awaitable<Payload.Find.ByValue<StoredValue>>;
  public abstract [Method.Find](payload: Payload.Find<StoredValue>): Awaitable<Payload.Find<StoredValue>>;

  /**
   * A method which mimics the functionality of [Map#get()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get), except this has support for a path.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Get]<Value = StoredValue>(payload: Payload.Get<Value>): Awaitable<Payload.Get<Value>>;

  /**
   * A method to get multiple entries.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.GetMany](payload: Payload.GetMany<StoredValue>): Awaitable<Payload.GetMany<StoredValue>>;

  /**
   * A method which mimics the functionality of [Map#has()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has), except this has support for a path.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Has](payload: Payload.Has): Awaitable<Payload.Has>;

  /**
   * Increments an entry or a path in an entry by one.
   *
   * An error should be pushed to the payload and immediately return, if any of the following occurs:
   * - The entry or path in an entry does not exist - `CommonIdentifiers.MissingData`
   * - The data is not an integer - `CommonIdentifiers.InvalidDataType``
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Inc](payload: Payload.Inc): Awaitable<Payload.Inc>;

  /**
   * A method which mimics the functionality of [Map#keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys), except returns an array.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Keys](payload: Payload.Keys): Awaitable<Payload.Keys>;

  /**
   * A method which mimics the functionality of [Array#map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), except supports asynchronous functions.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Map]<Value = StoredValue>(
    payload: Payload.Map.ByHook<StoredValue, Value>
  ): Awaitable<Payload.Map.ByHook<StoredValue, Value>>;

  /**
   * A method which mimics the functionality of [Array#map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), except maps over a path.
   *
   * An error should be pushed to the payload and immediately return, if any of the following occurs:
   * - The data at the path is not found - `CommonIdentifiers.MissingData`
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Map]<Value = StoredValue>(payload: Payload.Map.ByPath<Value>): Awaitable<Payload.Map.ByPath<Value>>;
  public abstract [Method.Map]<Value = StoredValue>(payload: Payload.Map<StoredValue, Value>): Awaitable<Payload.Map<StoredValue, Value>>;

  /**
   * A method which executes a math operation a value with an operand either on the entry or a path in the entry.
   *
   * An error should be pushed to the payload and immediately return, if any of the following occurs:
   * - The key and/or path does not exist - `CommonIdentifiers.MissingData`
   * - The data is not an integer - `CommonIdentifiers.InvalidDataType`
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Math](payload: Payload.Math): Awaitable<Payload.Math>;

  /**
   * A method which mimics the functionality of [Array#filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), except returns both truthy and falsy entries and supports asynchronous functions.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Partition](payload: Payload.Partition.ByHook<StoredValue>): Awaitable<Payload.Partition.ByHook<StoredValue>>;

  /**
   * A method which mimics the functionality of [Array#filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), except returns both truthy and falsy entries and validates using a path and value.
   *
   * An error should be pushed to the payload and immediately return, if any of the following occurs:
   * - The data at the path is not found - `CommonIdentifiers.MissingData`
   * - The data at the path is not a primitive type - `CommonIdentifiers.InvalidDataType`
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Partition](payload: Payload.Partition.ByValue<StoredValue>): Awaitable<Payload.Partition.ByValue<StoredValue>>;
  public abstract [Method.Partition](payload: Payload.Partition<StoredValue>): Awaitable<Payload.Partition<StoredValue>>;

  /**
   * A method which mimics the functionality of [Array#push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push), except this supports a path.
   *
   * An error should be pushed to the payload and immediately return, if any of the following occurs:
   * - The key and/or path does not exist - `CommonIdentifiers.MissingData`
   * - The data at the path is not an array - `CommonIdentifiers.InvalidDataType`
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Push]<Value>(payload: Payload.Push<Value>): Awaitable<Payload.Push<Value>>;

  /**
   * A method which gets random value(s).
   * Whether duplicates are allowed or not are controlled by `Payload.Random#unique` option.
   * The amount of values returned is controlled by `Payload.Random#count` option.
   *
   * An error should be pushed to the payload and immediately return, if any of the following occurs:
   * - Unique is disabled and the provider size is 0 - `CommonIdentifiers.MissingData`
   * - Unique is enabled and the provider size is less then the count - `CommonIdentifiers.InvalidCount`
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Random](payload: Payload.Random<StoredValue>): Awaitable<Payload.Random<StoredValue>>;

  /**
   * A method which gets random key(s).
   * Whether duplicates are allowed or not are controlled by `Payload.RandomKey#unique` option.
   * The amount of keys returned is controlled by `Payload.RandomKey#count` option.
   *
   * An error should be pushed to the payload and immediately return, if any of the following occurs:
   * - Unique is disabled and the provider size is 0  - `CommonIdentifiers.MissingData`
   * - Unique is enabled and the provider size is less then the count - `CommonIdentifiers.InvalidCount`
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.RandomKey](payload: Payload.RandomKey): Awaitable<Payload.RandomKey>;

  /**
   * A method which mimics the functionality of [Array#filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), except it removes the values filtered and uses a path and value to validate
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Remove]<StoredValue>(payload: Payload.Remove.ByHook<StoredValue>): Awaitable<Payload.Remove.ByHook<StoredValue>>;

  /**
   * A method which mimics the functionality of [Array#filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), except it removes the values filtered and uses a path and value to validate
   *
   * An error should be pushed to the payload and immediately return, if any of the following occurs:
   * - The key and/or path does not exist - `CommonIdentifiers.MissingData`
   * - The data at the path is not an array - `CommonIdentifiers.InvalidDataType`
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Remove]<Value>(payload: Payload.Remove.ByValue): Awaitable<Payload.Remove.ByValue>;
  public abstract [Method.Remove]<StoredValue>(payload: Payload.Remove<StoredValue>): Awaitable<Payload.Remove<StoredValue>>;

  /**
   * A method which mimics the functionality of [Map#set()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set), except this supports a path.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Set]<Value = StoredValue>(payload: Payload.Set<Value>): Awaitable<Payload.Set<Value>>;

  /**
   * A method which sets multiple entries and/or paths in entries.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.SetMany](payload: Payload.SetMany): Awaitable<Payload.SetMany>;

  /**
   * A method which mimics the functionality of [Map#size()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size)
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Size](payload: Payload.Size): Awaitable<Payload.Size>;

  /**
   * A method which mimics the functionality of [Array#some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some), except this supports asynchronous functions.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Some]<StoredValue>(payload: Payload.Some.ByHook<StoredValue>): Awaitable<Payload.Some.ByHook<StoredValue>>;

  /**
   * A method which mimics the functionality of [Array#some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some), except this uses a path and value to validate.
   *
   * An error should be pushed to the payload and immediately return, if any of the following occurs:
   * - The path does not exist on an entry - `CommonIdentifiers.MissingData`
   * - The data at the path is not a primitive type - `CommonIdentifiers.InvalidDataType`
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Some]<Value>(payload: Payload.Some.ByValue): Awaitable<Payload.Some.ByValue>;
  public abstract [Method.Some]<StoredValue>(payload: Payload.Some<StoredValue>): Awaitable<Payload.Some<StoredValue>>;

  /**
   * A method which gets the stored value at a key and passes it to an asynchronous function and sets the data returned.
   *
   * An error should be pushed to the payload and immediately return, if any of the following occurs:
   * - The key does not exist - `CommonIdentifiers.MissingData`
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Update]<Value>(payload: Payload.Update<StoredValue, Value>): Awaitable<Payload.Update<StoredValue, Value>>;

  /**
   * A method which mimics the functionality of [Map#values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values), except this returns an array.
   * @since 1.0.0
   * @param payload The payload sent by this provider's Josh instance.
   * @returns The payload (modified), originally sent by this provider's Josh instance.
   */
  public abstract [Method.Values](payload: Payload.Values<StoredValue>): Awaitable<Payload.Values<StoredValue>>;

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
        origin: { type: JoshProviderError.OriginType.Provider, name: this.constructor.name.replace(/Provider/, '') },
        message: this.resolveIdentifier(options, metadata),
      });
    }

    return new JoshProviderError({
      ...options,
      name: options.name ?? `${this.constructor.name}Error`,
      origin: { type: JoshProviderError.OriginType.Provider, name: this.constructor.name.replace(/Provider/, '') },
    });
  }

  /**
   * Resolves an identifier.
   * @since 1.0.0
   * @param identifier The identifier to resolve.
   * @param metadata The metadata to use.
   * @returns The resolved identifier message.
   */
  protected resolveIdentifier(identifier: string, metadata: Record<string, unknown> = {}): string {
    const result = resolveCommonIdentifier(identifier, metadata);

    if (result !== null) {
      return result;
    }

    switch (identifier) {
      case JoshProvider.CommonIdentifiers.MigrationNotFound: {
        const { version } = metadata;
        const { major, minor, patch } = version as Semver;

        return `Migration not found for version ${major}.${minor}.${patch}.`;
      }

      case JoshProvider.CommonIdentifiers.NeedsMigration:
        return `[${this.constructor.name}]: The provider ${
          this.name?.length ? `with the name "${this.name}" ` : ''
        }needs migrations. Please set the "allowMigrations" option to true to run migrations automatically.`;
    }

    throw new Error(`'${this.constructor.name}#resolveIdentifier()' received an unknown identifier: '${identifier}'`);
  }

  protected abstract fetchVersion(context: JoshProvider.Context): Awaitable<Semver>;
}

export namespace JoshProvider {
  /**
   * The options to extend for {@link JoshProvider}
   * @since 1.0.0
   *
   * @example
   * ```typescript
   * export namespace Provider {
   *   export interface Options extends JoshProvider.Options {
   *     // Provider options...
   *   }
   * }
   * ```
   */
  export interface Options {
    /**
     * Whether to allow automatic provider data migrations.
     * @since 1.0.0
     */
    allowMigrations?: boolean;
  }

  /**
   * The context sent by the Josh instance.
   * @since 1.0.0
   */
  export interface Context {
    /**
     * The name of this context.
     * @since 1.0.0
     */
    name: string;
  }

  /**
   * A migration for the {@link JoshProvider} instance.
   * @since 1.0.0
   */
  export interface Migration {
    /**
     * The version this migration is for.
     * @since 1.0.0
     */
    version: Semver;

    /**
     * The method to run when the current version of the provider matches it.
     * @since 1.0.0
     * @param context The context for the provider to the migration.
     */
    run(context: Context): Awaitable<void>;
  }

  /**
   * An enum of common identifiers used within {@link JoshProvider}
   * @since 1.0.0
   */
  export enum CommonIdentifiers {
    MigrationNotFound = 'MigrationNotFound',

    NeedsMigration = 'needsMigration',
  }
}
