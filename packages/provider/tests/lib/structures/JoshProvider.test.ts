import { CommonIdentifiers, JoshProvider, Method, Payload } from '../../../src';

describe('JoshProvider', () => {
  describe('is a class', () => {
    test('GIVEN typeof JoshProvider THEN returns function', () => {
      expect(typeof JoshProvider).toBe('function');
    });

    test('GIVEN typeof ...prototype THEN returns object', () => {
      expect(typeof JoshProvider.prototype).toBe('object');
    });
  });

  class TestProvider<StoredValue = unknown> extends JoshProvider<StoredValue> {
    public migrations = [
      {
        version: { major: 1, minor: 0, patch: 0 },
        run() {}
      }
    ];

    public get version() {
      return { major: 2, minor: 0, patch: 0 };
    }

    public deleteMetadata(_key: string): void {}

    public getMetadata(_key: string): unknown {
      return undefined;
    }

    public setMetadata(_key: string, _value: unknown): void {}

    public [Method.AutoKey](payload: Payload.AutoKey): Payload.AutoKey {
      return payload;
    }

    public [Method.Clear](payload: Payload.Clear): Payload.Clear {
      return payload;
    }

    public [Method.Dec](payload: Payload.Dec): Payload.Dec {
      return payload;
    }

    public [Method.Delete](payload: Payload.Delete): Payload.Delete {
      return payload;
    }

    public [Method.DeleteMany](payload: Payload.DeleteMany): Payload.DeleteMany {
      return payload;
    }

    public [Method.Each](payload: Payload.Each<StoredValue>): Payload.Each<StoredValue> {
      return payload;
    }

    public [Method.Ensure](payload: Payload.Ensure<StoredValue>): Payload.Ensure<StoredValue> {
      return payload;
    }

    public [Method.Entries](payload: Payload.Entries<StoredValue>): Payload.Entries<StoredValue> {
      return payload;
    }

    public [Method.Every]<StoredValue>(payload: Payload.Every.ByHook<StoredValue>): Payload.Every.ByHook<StoredValue>;

    public [Method.Every]<Value>(payload: Payload.Every.ByValue): Payload.Every.ByValue;
    public [Method.Every]<StoredValue>(payload: Payload.Every<StoredValue>): Payload.Every<StoredValue> {
      return payload;
    }

    public [Method.Filter](payload: Payload.Filter.ByHook<StoredValue>): Payload.Filter.ByHook<StoredValue>;

    public [Method.Filter](payload: Payload.Filter.ByValue<StoredValue>): Payload.Filter.ByValue<StoredValue>;
    public [Method.Filter](payload: Payload.Filter<StoredValue>): Payload.Filter<StoredValue> {
      return payload;
    }

    public [Method.Find](payload: Payload.Find.ByHook<StoredValue>): Payload.Find.ByHook<StoredValue>;

    public [Method.Find](payload: Payload.Find.ByValue<StoredValue>): Payload.Find.ByValue<StoredValue>;
    public [Method.Find](payload: Payload.Find<StoredValue>): Payload.Find<StoredValue> {
      return payload;
    }

    public [Method.Get]<Value = StoredValue>(payload: Payload.Get<Value>): Payload.Get<Value> {
      return payload;
    }

    public [Method.GetMany](payload: Payload.GetMany<StoredValue>): Payload.GetMany<StoredValue> {
      return payload;
    }

    public [Method.Has](payload: Payload.Has): Payload.Has {
      return payload;
    }

    public [Method.Inc](payload: Payload.Inc): Payload.Inc {
      return payload;
    }

    public [Method.Keys](payload: Payload.Keys): Payload.Keys {
      return payload;
    }

    public [Method.Map]<Value = StoredValue>(payload: Payload.Map.ByHook<StoredValue, Value>): Payload.Map.ByHook<StoredValue, Value>;

    public [Method.Map]<Value = StoredValue>(payload: Payload.Map.ByPath<Value>): Payload.Map.ByPath<Value>;
    public [Method.Map]<Value = StoredValue>(payload: Payload.Map<StoredValue, Value>): Payload.Map<StoredValue, Value> {
      return payload;
    }

    public [Method.Math](payload: Payload.Math): Payload.Math {
      return payload;
    }

    public [Method.Partition](payload: Payload.Partition.ByHook<StoredValue>): Payload.Partition.ByHook<StoredValue>;

    public [Method.Partition](payload: Payload.Partition.ByValue<StoredValue>): Payload.Partition.ByValue<StoredValue>;
    public [Method.Partition](payload: Payload.Partition<StoredValue>): Payload.Partition<StoredValue> {
      return payload;
    }

    public [Method.Push]<Value>(payload: Payload.Push<Value>): Payload.Push<Value> {
      return payload;
    }

    public [Method.Random](payload: Payload.Random<StoredValue>): Payload.Random<StoredValue> {
      return payload;
    }

    public [Method.RandomKey](payload: Payload.RandomKey): Payload.RandomKey {
      return payload;
    }

    public [Method.Remove]<StoredValue>(payload: Payload.Remove.ByHook<StoredValue>): Payload.Remove.ByHook<StoredValue>;

    public [Method.Remove]<Value>(payload: Payload.Remove.ByValue): Payload.Remove.ByValue;
    public [Method.Remove]<StoredValue>(payload: Payload.Remove<StoredValue>): Payload.Remove<StoredValue> {
      return payload;
    }

    public [Method.Set]<Value = StoredValue>(payload: Payload.Set<Value>): Payload.Set<Value> {
      return payload;
    }

    public [Method.SetMany](payload: Payload.SetMany): Payload.SetMany {
      return payload;
    }

    public [Method.Size](payload: Payload.Size): Payload.Size {
      return payload;
    }

    public [Method.Some]<StoredValue>(payload: Payload.Some.ByHook<StoredValue>): Payload.Some.ByHook<StoredValue>;

    public [Method.Some]<Value>(payload: Payload.Some.ByValue): Payload.Some.ByValue;
    public [Method.Some]<StoredValue>(payload: Payload.Some<StoredValue>): Payload.Some<StoredValue> {
      return payload;
    }

    public [Method.Update]<Value>(payload: Payload.Update<StoredValue, Value>): Payload.Update<StoredValue, Value> {
      return payload;
    }

    public [Method.Values](payload: Payload.Values<StoredValue>): Payload.Values<StoredValue> {
      return payload;
    }

    protected fetchVersion() {
      return { major: 1, minor: 0, patch: 0 };
    }
  }

  const provider = new TestProvider({ allowMigrations: true });

  describe('migrations', () => {
    test('GIVEN migrations THEN passes', async () => {
      await provider.init({ name: 'name' });
    });

    test('GIVEN no migrations THEN throws', async () => {
      provider.migrations = [];

      await expect(provider.init({ name: 'name' })).rejects.toThrowError(
        provider['error'](JoshProvider.CommonIdentifiers.MigrationNotFound, { version: { major: 1, minor: 0, patch: 0 } })
      );
    });

    test('GIVEN disabled migrations THEN throws', async () => {
      provider.options.allowMigrations = false;

      await expect(provider.init({ name: 'name' })).rejects.toThrowError(provider['error'](JoshProvider.CommonIdentifiers.NeedsMigration));
    });
  });

  describe('error', () => {
    test('GIVEN object THEN returns error', () => {
      expect(provider['error']({ identifier: 'test' }));
    });
  });

  describe('resolveIdentifier', () => {
    test('GIVEN common identifier THEN returns resolved identifier', () => {
      expect(provider['resolveIdentifier'](CommonIdentifiers.InvalidCount)).toBe(
        'The "count" of items must be less than or equal to the amount of items in the provider.'
      );
    });

    test('GIVEN unknown identifier THEN throws', () => {
      expect(() => provider['resolveIdentifier']('test')).toThrowError(
        new Error(`'${provider.constructor.name}#resolveIdentifier()' received an unknown identifier: 'test'`)
      );
    });
  });
});
