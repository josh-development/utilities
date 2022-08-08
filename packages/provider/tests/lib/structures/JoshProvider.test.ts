import { JoshProvider, Method, Payloads } from '../../../src';

describe('JoshProvider', () => {
  describe('is a class', () => {
    test('GIVEN typeof JoshProvider THEN returns function', () => {
      expect(typeof JoshProvider).toBe('function');
    });

    test('GIVEN typeof ...prototype THEN returns object', () => {
      expect(typeof JoshProvider.prototype).toBe('object');
    });
  });

  describe('migrations', () => {
    class TestProvider<StoredValue = unknown> extends JoshProvider<StoredValue> {
      public migrations = [
        {
          version: { major: 1, minor: 0, patch: 0 },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          run() {}
        }
      ];

      public get version() {
        return { major: 2, minor: 0, patch: 0 };
      }

      public [Method.AutoKey](payload: Payloads.AutoKey): Payloads.AutoKey {
        return payload;
      }

      public [Method.Clear](payload: Payloads.Clear): Payloads.Clear {
        return payload;
      }

      public [Method.Dec](payload: Payloads.Dec): Payloads.Dec {
        return payload;
      }

      public [Method.Delete](payload: Payloads.Delete): Payloads.Delete {
        return payload;
      }

      public [Method.DeleteMany](payload: Payloads.DeleteMany): Payloads.DeleteMany {
        return payload;
      }

      public [Method.Each](payload: Payloads.Each<StoredValue>): Payloads.Each<StoredValue> {
        return payload;
      }

      public [Method.Ensure](payload: Payloads.Ensure<StoredValue>): Payloads.Ensure<StoredValue> {
        return payload;
      }

      public [Method.Entries](payload: Payloads.Entries<StoredValue>): Payloads.Entries<StoredValue> {
        return payload;
      }

      public [Method.Every]<StoredValue>(payload: Payloads.Every.ByHook<StoredValue>): Payloads.Every.ByHook<StoredValue>;

      public [Method.Every]<Value>(payload: Payloads.Every.ByValue): Payloads.Every.ByValue;
      public [Method.Every]<StoredValue>(payload: Payloads.Every<StoredValue>): Payloads.Every<StoredValue> {
        return payload;
      }

      public [Method.Filter](payload: Payloads.Filter.ByHook<StoredValue>): Payloads.Filter.ByHook<StoredValue>;

      public [Method.Filter](payload: Payloads.Filter.ByValue<StoredValue>): Payloads.Filter.ByValue<StoredValue>;
      public [Method.Filter](payload: Payloads.Filter<StoredValue>): Payloads.Filter<StoredValue> {
        return payload;
      }

      public [Method.Find](payload: Payloads.Find.ByHook<StoredValue>): Payloads.Find.ByHook<StoredValue>;

      public [Method.Find](payload: Payloads.Find.ByValue<StoredValue>): Payloads.Find.ByValue<StoredValue>;
      public [Method.Find](payload: Payloads.Find<StoredValue>): Payloads.Find<StoredValue> {
        return payload;
      }

      public [Method.Get]<Value = StoredValue>(payload: Payloads.Get<Value>): Payloads.Get<Value> {
        return payload;
      }

      public [Method.GetMany](payload: Payloads.GetMany<StoredValue>): Payloads.GetMany<StoredValue> {
        return payload;
      }

      public [Method.Has](payload: Payloads.Has): Payloads.Has {
        return payload;
      }

      public [Method.Inc](payload: Payloads.Inc): Payloads.Inc {
        return payload;
      }

      public [Method.Keys](payload: Payloads.Keys): Payloads.Keys {
        return payload;
      }

      public [Method.Map]<Value = StoredValue>(payload: Payloads.Map.ByHook<StoredValue, Value>): Payloads.Map.ByHook<StoredValue, Value>;

      public [Method.Map]<Value = StoredValue>(payload: Payloads.Map.ByPath<Value>): Payloads.Map.ByPath<Value>;
      public [Method.Map]<Value = StoredValue>(payload: Payloads.Map<StoredValue, Value>): Payloads.Map<StoredValue, Value> {
        return payload;
      }

      public [Method.Math](payload: Payloads.Math): Payloads.Math {
        return payload;
      }

      public [Method.Partition](payload: Payloads.Partition.ByHook<StoredValue>): Payloads.Partition.ByHook<StoredValue>;

      public [Method.Partition](payload: Payloads.Partition.ByValue<StoredValue>): Payloads.Partition.ByValue<StoredValue>;
      public [Method.Partition](payload: Payloads.Partition<StoredValue>): Payloads.Partition<StoredValue> {
        return payload;
      }

      public [Method.Push]<Value>(payload: Payloads.Push<Value>): Payloads.Push<Value> {
        return payload;
      }

      public [Method.Random](payload: Payloads.Random<StoredValue>): Payloads.Random<StoredValue> {
        return payload;
      }

      public [Method.RandomKey](payload: Payloads.RandomKey): Payloads.RandomKey {
        return payload;
      }

      public [Method.Remove]<StoredValue>(payload: Payloads.Remove.ByHook<StoredValue>): Payloads.Remove.ByHook<StoredValue>;

      public [Method.Remove]<Value>(payload: Payloads.Remove.ByValue): Payloads.Remove.ByValue;
      public [Method.Remove]<StoredValue>(payload: Payloads.Remove<StoredValue>): Payloads.Remove<StoredValue> {
        return payload;
      }

      public [Method.Set]<Value = StoredValue>(payload: Payloads.Set<Value>): Payloads.Set<Value> {
        return payload;
      }

      public [Method.SetMany](payload: Payloads.SetMany): Payloads.SetMany {
        return payload;
      }

      public [Method.Size](payload: Payloads.Size): Payloads.Size {
        return payload;
      }

      public [Method.Some]<StoredValue>(payload: Payloads.Some.ByHook<StoredValue>): Payloads.Some.ByHook<StoredValue>;

      public [Method.Some]<Value>(payload: Payloads.Some.ByValue): Payloads.Some.ByValue;
      public [Method.Some]<StoredValue>(payload: Payloads.Some<StoredValue>): Payloads.Some<StoredValue> {
        return payload;
      }

      public [Method.Update]<Value>(payload: Payloads.Update<StoredValue, Value>): Payloads.Update<StoredValue, Value> {
        return payload;
      }

      public [Method.Values](payload: Payloads.Values<StoredValue>): Payloads.Values<StoredValue> {
        return payload;
      }

      protected fetchVersion() {
        return { major: 1, minor: 0, patch: 0 };
      }
    }

    const provider = new TestProvider({ allowMigrations: true });

    test('should migrate data', async () => {
      await provider.init({ name: 'test:name' });
    });
  });
});
