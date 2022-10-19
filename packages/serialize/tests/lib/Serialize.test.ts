import { Serialize } from '../../src';

describe('Serialize', () => {
  const rawBigInt = 0n;
  const rawBoolean = false;
  const rawDate = new Date();
  const rawNull = null;
  const rawNumber = 0;
  const rawRegExp = /test/g;
  const rawString = 'test';
  const rawUndefined = undefined;
  const jsonBigInt = rawBigInt.toString();
  const jsonBoolean = rawBoolean;
  const jsonDate = rawDate.toJSON();
  const jsonNull = rawNull;
  const jsonNumber = rawNumber;
  const jsonRegExp = { source: rawRegExp.source, flags: rawRegExp.flags };
  const jsonString = rawString;
  const jsonUndefined = `${rawUndefined}`;

  describe('Serialize.toJSON', () => {
    test('GIVEN typeof toJSON THEN returns functions', () => {
      expect(typeof Serialize.toJSON).toBe('function');
    });

    describe('can format raw data', () => {
      describe(Serialize.Type.Array, () => {
        test(Serialize.Type.BigInt, () => {
          const { type, value } = Serialize.toJSON([rawBigInt]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ type: Serialize.Type.BigInt, value: jsonBigInt }]);
        });

        test(Serialize.Type.Boolean, () => {
          const { type, value } = Serialize.toJSON([rawBoolean]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ type: Serialize.Type.Boolean, value: jsonBoolean }]);
        });

        test(Serialize.Type.Date, () => {
          const { type, value } = Serialize.toJSON([rawDate]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ type: Serialize.Type.Date, value: jsonDate }]);
        });

        test(Serialize.Type.Null, () => {
          const { type, value } = Serialize.toJSON([rawNull]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ type: Serialize.Type.Null, value: jsonNull }]);
        });

        test(Serialize.Type.Number, () => {
          const { type, value } = Serialize.toJSON([rawNumber]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ type: Serialize.Type.Number, value: jsonNumber }]);
        });

        test(Serialize.Type.RegExp, () => {
          const { type, value } = Serialize.toJSON([rawRegExp]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ type: Serialize.Type.RegExp, value: jsonRegExp }]);
        });

        test(Serialize.Type.String, () => {
          const { type, value } = Serialize.toJSON([rawString]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ type: Serialize.Type.String, value: jsonString }]);
        });

        test(Serialize.Type.Undefined, () => {
          const { type, value } = Serialize.toJSON([rawUndefined]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ type: Serialize.Type.Undefined, value: jsonUndefined }]);
        });
      });

      test(Serialize.Type.BigInt, () => {
        const { type, value } = Serialize.toJSON(rawBigInt);

        expect(type).toBe(Serialize.Type.BigInt);
        expect(value).toStrictEqual(jsonBigInt);
      });

      test(Serialize.Type.Boolean, () => {
        const { type, value } = Serialize.toJSON(rawBoolean);

        expect(type).toBe(Serialize.Type.Boolean);
        expect(value).toStrictEqual(jsonBoolean);
      });

      test(Serialize.Type.Date, () => {
        const { type, value } = Serialize.toJSON(rawDate);

        expect(type).toBe(Serialize.Type.Date);
        expect(value).toStrictEqual(jsonDate);
      });

      describe(Serialize.Type.Map, () => {
        test(Serialize.Type.BigInt, () => {
          const { type, value } = Serialize.toJSON(new Map([['key', rawBigInt]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { type: Serialize.Type.BigInt, value: jsonBigInt }]]);
        });

        test(Serialize.Type.Boolean, () => {
          const { type, value } = Serialize.toJSON(new Map([['key', rawBoolean]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { type: Serialize.Type.Boolean, value: jsonBoolean }]]);
        });

        test(Serialize.Type.Date, () => {
          const { type, value } = Serialize.toJSON(new Map([['key', rawDate]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { type: Serialize.Type.Date, value: jsonDate }]]);
        });

        test(Serialize.Type.Null, () => {
          const { type, value } = Serialize.toJSON(new Map([['key', rawNull]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { type: Serialize.Type.Null, value: jsonNull }]]);
        });

        test(Serialize.Type.Number, () => {
          const { type, value } = Serialize.toJSON(new Map([['key', rawNumber]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { type: Serialize.Type.Number, value: jsonNumber }]]);
        });

        test(Serialize.Type.RegExp, () => {
          const { type, value } = Serialize.toJSON(new Map([['key', rawRegExp]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { type: Serialize.Type.RegExp, value: jsonRegExp }]]);
        });

        test(Serialize.Type.String, () => {
          const { type, value } = Serialize.toJSON(new Map([['key', rawString]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { type: Serialize.Type.String, value: jsonString }]]);
        });

        test(Serialize.Type.Undefined, () => {
          const { type, value } = Serialize.toJSON(new Map([['key', rawUndefined]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { type: Serialize.Type.Undefined, value: jsonUndefined }]]);
        });
      });

      test(Serialize.Type.Null, () => {
        const { type, value } = Serialize.toJSON(rawNull);

        expect(type).toBe(Serialize.Type.Null);
        expect(value).toStrictEqual(jsonNull);
      });

      test(Serialize.Type.Number, () => {
        const { type, value } = Serialize.toJSON(rawNumber);

        expect(type).toBe(Serialize.Type.Number);
        expect(value).toStrictEqual(jsonNumber);
      });

      describe(Serialize.Type.Object, () => {
        test(Serialize.Type.BigInt, () => {
          const { type, value } = Serialize.toJSON({ key: rawBigInt });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { type: Serialize.Type.BigInt, value: jsonBigInt } });
        });

        test(Serialize.Type.Boolean, () => {
          const { type, value } = Serialize.toJSON({ key: rawBoolean });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { type: Serialize.Type.Boolean, value: jsonBoolean } });
        });

        test(Serialize.Type.Date, () => {
          const { type, value } = Serialize.toJSON({ key: rawDate });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { type: Serialize.Type.Date, value: jsonDate } });
        });

        test(Serialize.Type.Null, () => {
          const { type, value } = Serialize.toJSON({ key: rawNull });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { type: Serialize.Type.Null, value: jsonNull } });
        });

        test(Serialize.Type.Number, () => {
          const { type, value } = Serialize.toJSON({ key: rawNumber });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { type: Serialize.Type.Number, value: jsonNumber } });
        });

        test(Serialize.Type.RegExp, () => {
          const { type, value } = Serialize.toJSON({ key: rawRegExp });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { type: Serialize.Type.RegExp, value: jsonRegExp } });
        });

        test(Serialize.Type.String, () => {
          const { type, value } = Serialize.toJSON({ key: rawString });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { type: Serialize.Type.String, value: jsonString } });
        });

        test(Serialize.Type.Undefined, () => {
          const { type, value } = Serialize.toJSON({ key: rawUndefined });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { type: Serialize.Type.Undefined, value: jsonUndefined } });
        });
      });

      test(Serialize.Type.RegExp, () => {
        const { type, value } = Serialize.toJSON(rawRegExp);

        expect(type).toBe(Serialize.Type.RegExp);
        expect(value).toStrictEqual(jsonRegExp);
      });

      describe(Serialize.Type.Set, () => {
        test(Serialize.Type.BigInt, () => {
          const { type, value } = Serialize.toJSON(new Set([rawBigInt]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ type: Serialize.Type.BigInt, value: jsonBigInt }]);
        });

        test(Serialize.Type.Boolean, () => {
          const { type, value } = Serialize.toJSON(new Set([rawBoolean]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ type: Serialize.Type.Boolean, value: jsonBoolean }]);
        });

        test(Serialize.Type.Date, () => {
          const { type, value } = Serialize.toJSON(new Set([rawDate]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ type: Serialize.Type.Date, value: jsonDate }]);
        });

        test(Serialize.Type.Null, () => {
          const { type, value } = Serialize.toJSON(new Set([rawNull]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ type: Serialize.Type.Null, value: jsonNull }]);
        });

        test(Serialize.Type.Number, () => {
          const { type, value } = Serialize.toJSON(new Set([rawNumber]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ type: Serialize.Type.Number, value: jsonNumber }]);
        });

        test(Serialize.Type.RegExp, () => {
          const { type, value } = Serialize.toJSON(new Set([rawRegExp]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ type: Serialize.Type.RegExp, value: jsonRegExp }]);
        });

        test(Serialize.Type.String, () => {
          const { type, value } = Serialize.toJSON(new Set([rawString]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ type: Serialize.Type.String, value: jsonString }]);
        });

        test(Serialize.Type.Undefined, () => {
          const { type, value } = Serialize.toJSON(new Set([rawUndefined]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ type: Serialize.Type.Undefined, value: jsonUndefined }]);
        });
      });

      test(Serialize.Type.String, () => {
        const { type, value } = Serialize.toJSON(rawString);

        expect(type).toBe(Serialize.Type.String);
        expect(value).toStrictEqual(jsonString);
      });

      test(Serialize.Type.Undefined, () => {
        const { type, value } = Serialize.toJSON(rawUndefined);

        expect(type).toBe(Serialize.Type.Undefined);
        expect(value).toStrictEqual(jsonUndefined);
      });
    });

    test('GIVEN unknown type THEN throws error', () => {
      expect(() => Serialize.toJSON(() => true)).toThrowError(
        new TypeError('Serialize received an unknown type while formatting: "Function", see @joshdb/transform for custom serialization')
      );
    });
  });

  describe('Serialize.fromJSON', () => {
    test('GIVEN typeof fromJSON THEN returns function', () => {
      expect(typeof Serialize.fromJSON).toBe('function');
    });

    describe('can parse json data', () => {
      describe(Serialize.Type.Array, () => {
        test(Serialize.Type.BigInt, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Array, value: [{ type: Serialize.Type.BigInt, value: jsonBigInt }] })).toStrictEqual([
            rawBigInt
          ]);
        });

        test(Serialize.Type.Boolean, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Array, value: [{ type: Serialize.Type.Boolean, value: jsonBoolean }] })).toStrictEqual([
            rawBoolean
          ]);
        });

        test(Serialize.Type.Date, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Array, value: [{ type: Serialize.Type.Date, value: jsonDate }] })).toStrictEqual([
            rawDate
          ]);
        });

        test(Serialize.Type.Null, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Array, value: [{ type: Serialize.Type.Null, value: jsonNull }] })).toStrictEqual([
            rawNull
          ]);
        });

        test(Serialize.Type.Number, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Array, value: [{ type: Serialize.Type.Number, value: jsonNumber }] })).toStrictEqual([
            rawNumber
          ]);
        });

        test(Serialize.Type.RegExp, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Array, value: [{ type: Serialize.Type.RegExp, value: jsonRegExp }] })).toStrictEqual([
            rawRegExp
          ]);
        });

        test(Serialize.Type.String, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Array, value: [{ type: Serialize.Type.String, value: jsonString }] })).toStrictEqual([
            rawString
          ]);
        });

        test(Serialize.Type.Undefined, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Array, value: [{ type: Serialize.Type.Undefined, value: jsonUndefined }] })).toStrictEqual(
            [rawUndefined]
          );
        });
      });

      test(Serialize.Type.BigInt, () => {
        expect(Serialize.fromJSON({ type: Serialize.Type.BigInt, value: jsonBigInt })).toBe(rawBigInt);
      });

      test(Serialize.Type.Boolean, () => {
        expect(Serialize.fromJSON({ type: Serialize.Type.Boolean, value: jsonBoolean })).toBe(rawBoolean);
      });

      test(Serialize.Type.Date, () => {
        expect(Serialize.fromJSON({ type: Serialize.Type.Date, value: jsonDate })).toStrictEqual(rawDate);
      });

      describe(Serialize.Type.Map, () => {
        test(Serialize.Type.BigInt, () => {
          expect(
            Serialize.fromJSON({ type: Serialize.Type.Map, value: [['key', { type: Serialize.Type.BigInt, value: jsonBigInt }]] })
          ).toStrictEqual(new Map([['key', rawBigInt]]));
        });

        test(Serialize.Type.Boolean, () => {
          expect(
            Serialize.fromJSON({ type: Serialize.Type.Map, value: [['key', { type: Serialize.Type.Boolean, value: jsonBoolean }]] })
          ).toStrictEqual(new Map([['key', rawBoolean]]));
        });

        test(Serialize.Type.Date, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Map, value: [['key', { type: Serialize.Type.Date, value: jsonDate }]] })).toStrictEqual(
            new Map([['key', rawDate]])
          );
        });

        test(Serialize.Type.Null, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Map, value: [['key', { type: Serialize.Type.Null, value: jsonNull }]] })).toStrictEqual(
            new Map([['key', rawNull]])
          );
        });

        test(Serialize.Type.Number, () => {
          expect(
            Serialize.fromJSON({ type: Serialize.Type.Map, value: [['key', { type: Serialize.Type.Number, value: jsonNumber }]] })
          ).toStrictEqual(new Map([['key', rawNumber]]));
        });

        test(Serialize.Type.RegExp, () => {
          expect(
            Serialize.fromJSON({ type: Serialize.Type.Map, value: [['key', { type: Serialize.Type.RegExp, value: jsonRegExp }]] })
          ).toStrictEqual(new Map([['key', rawRegExp]]));
        });

        test(Serialize.Type.String, () => {
          expect(
            Serialize.fromJSON({ type: Serialize.Type.Map, value: [['key', { type: Serialize.Type.String, value: jsonString }]] })
          ).toStrictEqual(new Map([['key', rawString]]));
        });

        test(Serialize.Type.Undefined, () => {
          expect(
            Serialize.fromJSON({ type: Serialize.Type.Map, value: [['key', { type: Serialize.Type.Undefined, value: jsonUndefined }]] })
          ).toStrictEqual(new Map([['key', rawUndefined]]));
        });
      });

      test(Serialize.Type.Null, () => {
        expect(Serialize.fromJSON({ type: Serialize.Type.Null, value: jsonNull })).toBe(rawNull);
      });

      test(Serialize.Type.Number, () => {
        expect(Serialize.fromJSON({ type: Serialize.Type.Number, value: jsonNumber })).toBe(rawNumber);
      });

      describe(Serialize.Type.Object, () => {
        test(Serialize.Type.BigInt, () => {
          expect(
            Serialize.fromJSON({ type: Serialize.Type.Object, value: { key: { type: Serialize.Type.BigInt, value: jsonBigInt } } })
          ).toStrictEqual({
            key: rawBigInt
          });
        });

        test(Serialize.Type.Boolean, () => {
          expect(
            Serialize.fromJSON({ type: Serialize.Type.Object, value: { key: { type: Serialize.Type.Boolean, value: jsonBoolean } } })
          ).toStrictEqual({
            key: rawBoolean
          });
        });

        test(Serialize.Type.Date, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Object, value: { key: { type: Serialize.Type.Date, value: jsonDate } } })).toStrictEqual({
            key: rawDate
          });
        });

        test(Serialize.Type.Null, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Object, value: { key: { type: Serialize.Type.Null, value: jsonNull } } })).toStrictEqual({
            key: rawNull
          });
        });

        test(Serialize.Type.Number, () => {
          expect(
            Serialize.fromJSON({ type: Serialize.Type.Object, value: { key: { type: Serialize.Type.Number, value: jsonNumber } } })
          ).toStrictEqual({
            key: rawNumber
          });
        });

        test(Serialize.Type.RegExp, () => {
          expect(
            Serialize.fromJSON({ type: Serialize.Type.Object, value: { key: { type: Serialize.Type.RegExp, value: jsonRegExp } } })
          ).toStrictEqual({
            key: rawRegExp
          });
        });

        test(Serialize.Type.String, () => {
          expect(
            Serialize.fromJSON({ type: Serialize.Type.Object, value: { key: { type: Serialize.Type.String, value: jsonString } } })
          ).toStrictEqual({
            key: rawString
          });
        });

        test(Serialize.Type.Undefined, () => {
          expect(
            Serialize.fromJSON({ type: Serialize.Type.Object, value: { key: { type: Serialize.Type.Undefined, value: jsonUndefined } } })
          ).toStrictEqual({
            key: rawUndefined
          });
        });
      });

      test(Serialize.Type.RegExp, () => {
        expect(Serialize.fromJSON({ type: Serialize.Type.RegExp, value: jsonRegExp })).toStrictEqual(rawRegExp);
      });

      describe(Serialize.Type.Set, () => {
        test(Serialize.Type.BigInt, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Set, value: [{ type: Serialize.Type.BigInt, value: jsonBigInt }] })).toStrictEqual(
            new Set([rawBigInt])
          );
        });

        test(Serialize.Type.Boolean, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Set, value: [{ type: Serialize.Type.Boolean, value: jsonBoolean }] })).toStrictEqual(
            new Set([rawBoolean])
          );
        });

        test(Serialize.Type.Date, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Set, value: [{ type: Serialize.Type.Date, value: jsonDate }] })).toStrictEqual(
            new Set([rawDate])
          );
        });

        test(Serialize.Type.Null, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Set, value: [{ type: Serialize.Type.Null, value: jsonNull }] })).toStrictEqual(
            new Set([rawNull])
          );
        });

        test(Serialize.Type.Number, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Set, value: [{ type: Serialize.Type.Number, value: jsonNumber }] })).toStrictEqual(
            new Set([rawNumber])
          );
        });

        test(Serialize.Type.RegExp, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Set, value: [{ type: Serialize.Type.RegExp, value: jsonRegExp }] })).toStrictEqual(
            new Set([rawRegExp])
          );
        });

        test(Serialize.Type.String, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Set, value: [{ type: Serialize.Type.String, value: jsonString }] })).toStrictEqual(
            new Set([rawString])
          );
        });

        test(Serialize.Type.Undefined, () => {
          expect(Serialize.fromJSON({ type: Serialize.Type.Set, value: [{ type: Serialize.Type.Undefined, value: jsonUndefined }] })).toStrictEqual(
            new Set([rawUndefined])
          );
        });
      });

      test(Serialize.Type.String, () => {
        expect(Serialize.fromJSON({ type: Serialize.Type.String, value: jsonString })).toBe(rawString);
      });

      test(Serialize.Type.Undefined, () => {
        expect(Serialize.fromJSON({ type: Serialize.Type.Undefined, value: jsonUndefined })).toBe(rawUndefined);
      });
    });

    test('GIVEN unknown type THEN throws error', () => {
      // @ts-expect-error 2322 - Type 'function' is not assignable to type 'Serialize.Type'.
      expect(() => Serialize.fromJSON({ type: 'function' })).toThrowError('Serialize received an unknown type.');
    });
  });
});
