import { SerializeType, toRaw } from '../../src';

describe('toRaw', () => {
  test('GIVEN typeof toRaw THEN returns function', () => {
    expect(typeof toRaw).toBe('function');
  });

  describe('can parse json data', () => {
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

    describe(SerializeType.Array, () => {
      test(SerializeType.BigInt, () => {
        expect(toRaw({ type: SerializeType.Array, value: [{ type: SerializeType.BigInt, value: jsonBigInt }] })).toStrictEqual([rawBigInt]);
      });

      test(SerializeType.Boolean, () => {
        expect(toRaw({ type: SerializeType.Array, value: [{ type: SerializeType.Boolean, value: jsonBoolean }] })).toStrictEqual([rawBoolean]);
      });

      test(SerializeType.Date, () => {
        expect(toRaw({ type: SerializeType.Array, value: [{ type: SerializeType.Date, value: jsonDate }] })).toStrictEqual([rawDate]);
      });

      test(SerializeType.Null, () => {
        expect(toRaw({ type: SerializeType.Array, value: [{ type: SerializeType.Null, value: jsonNull }] })).toStrictEqual([rawNull]);
      });

      test(SerializeType.Number, () => {
        expect(toRaw({ type: SerializeType.Array, value: [{ type: SerializeType.Number, value: jsonNumber }] })).toStrictEqual([rawNumber]);
      });

      test(SerializeType.RegExp, () => {
        expect(toRaw({ type: SerializeType.Array, value: [{ type: SerializeType.RegExp, value: jsonRegExp }] })).toStrictEqual([rawRegExp]);
      });

      test(SerializeType.String, () => {
        expect(toRaw({ type: SerializeType.Array, value: [{ type: SerializeType.String, value: jsonString }] })).toStrictEqual([rawString]);
      });

      test(SerializeType.Undefined, () => {
        expect(toRaw({ type: SerializeType.Array, value: [{ type: SerializeType.Undefined, value: jsonUndefined }] })).toStrictEqual([rawUndefined]);
      });
    });

    test(SerializeType.BigInt, () => {
      expect(toRaw({ type: SerializeType.BigInt, value: jsonBigInt })).toBe(rawBigInt);
    });

    test(SerializeType.Boolean, () => {
      expect(toRaw({ type: SerializeType.Boolean, value: jsonBoolean })).toBe(rawBoolean);
    });

    test(SerializeType.Date, () => {
      expect(toRaw({ type: SerializeType.Date, value: jsonDate })).toStrictEqual(rawDate);
    });

    describe(SerializeType.Map, () => {
      test(SerializeType.BigInt, () => {
        expect(toRaw({ type: SerializeType.Map, value: [['key', { type: SerializeType.BigInt, value: jsonBigInt }]] })).toStrictEqual(
          new Map([['key', rawBigInt]])
        );
      });

      test(SerializeType.Boolean, () => {
        expect(toRaw({ type: SerializeType.Map, value: [['key', { type: SerializeType.Boolean, value: jsonBoolean }]] })).toStrictEqual(
          new Map([['key', rawBoolean]])
        );
      });

      test(SerializeType.Date, () => {
        expect(toRaw({ type: SerializeType.Map, value: [['key', { type: SerializeType.Date, value: jsonDate }]] })).toStrictEqual(
          new Map([['key', rawDate]])
        );
      });

      test(SerializeType.Null, () => {
        expect(toRaw({ type: SerializeType.Map, value: [['key', { type: SerializeType.Null, value: jsonNull }]] })).toStrictEqual(
          new Map([['key', rawNull]])
        );
      });

      test(SerializeType.Number, () => {
        expect(toRaw({ type: SerializeType.Map, value: [['key', { type: SerializeType.Number, value: jsonNumber }]] })).toStrictEqual(
          new Map([['key', rawNumber]])
        );
      });

      test(SerializeType.RegExp, () => {
        expect(toRaw({ type: SerializeType.Map, value: [['key', { type: SerializeType.RegExp, value: jsonRegExp }]] })).toStrictEqual(
          new Map([['key', rawRegExp]])
        );
      });

      test(SerializeType.String, () => {
        expect(toRaw({ type: SerializeType.Map, value: [['key', { type: SerializeType.String, value: jsonString }]] })).toStrictEqual(
          new Map([['key', rawString]])
        );
      });

      test(SerializeType.Undefined, () => {
        expect(toRaw({ type: SerializeType.Map, value: [['key', { type: SerializeType.Undefined, value: jsonUndefined }]] })).toStrictEqual(
          new Map([['key', rawUndefined]])
        );
      });
    });

    test(SerializeType.Null, () => {
      expect(toRaw({ type: SerializeType.Null, value: jsonNull })).toBe(rawNull);
    });

    test(SerializeType.Number, () => {
      expect(toRaw({ type: SerializeType.Number, value: jsonNumber })).toBe(rawNumber);
    });

    describe(SerializeType.Object, () => {
      test(SerializeType.BigInt, () => {
        expect(toRaw({ type: SerializeType.Object, value: { key: { type: SerializeType.BigInt, value: jsonBigInt } } })).toStrictEqual({
          key: rawBigInt
        });
      });

      test(SerializeType.Boolean, () => {
        expect(toRaw({ type: SerializeType.Object, value: { key: { type: SerializeType.Boolean, value: jsonBoolean } } })).toStrictEqual({
          key: rawBoolean
        });
      });

      test(SerializeType.Date, () => {
        expect(toRaw({ type: SerializeType.Object, value: { key: { type: SerializeType.Date, value: jsonDate } } })).toStrictEqual({
          key: rawDate
        });
      });

      test(SerializeType.Null, () => {
        expect(toRaw({ type: SerializeType.Object, value: { key: { type: SerializeType.Null, value: jsonNull } } })).toStrictEqual({
          key: rawNull
        });
      });

      test(SerializeType.Number, () => {
        expect(toRaw({ type: SerializeType.Object, value: { key: { type: SerializeType.Number, value: jsonNumber } } })).toStrictEqual({
          key: rawNumber
        });
      });

      test(SerializeType.RegExp, () => {
        expect(toRaw({ type: SerializeType.Object, value: { key: { type: SerializeType.RegExp, value: jsonRegExp } } })).toStrictEqual({
          key: rawRegExp
        });
      });

      test(SerializeType.String, () => {
        expect(toRaw({ type: SerializeType.Object, value: { key: { type: SerializeType.String, value: jsonString } } })).toStrictEqual({
          key: rawString
        });
      });

      test(SerializeType.Undefined, () => {
        expect(toRaw({ type: SerializeType.Object, value: { key: { type: SerializeType.Undefined, value: jsonUndefined } } })).toStrictEqual({
          key: rawUndefined
        });
      });
    });

    test(SerializeType.RegExp, () => {
      expect(toRaw({ type: SerializeType.RegExp, value: jsonRegExp })).toStrictEqual(rawRegExp);
    });

    describe(SerializeType.Set, () => {
      test(SerializeType.BigInt, () => {
        expect(toRaw({ type: SerializeType.Set, value: [{ type: SerializeType.BigInt, value: jsonBigInt }] })).toStrictEqual(new Set([rawBigInt]));
      });

      test(SerializeType.Boolean, () => {
        expect(toRaw({ type: SerializeType.Set, value: [{ type: SerializeType.Boolean, value: jsonBoolean }] })).toStrictEqual(new Set([rawBoolean]));
      });

      test(SerializeType.Date, () => {
        expect(toRaw({ type: SerializeType.Set, value: [{ type: SerializeType.Date, value: jsonDate }] })).toStrictEqual(new Set([rawDate]));
      });

      test(SerializeType.Null, () => {
        expect(toRaw({ type: SerializeType.Set, value: [{ type: SerializeType.Null, value: jsonNull }] })).toStrictEqual(new Set([rawNull]));
      });

      test(SerializeType.Number, () => {
        expect(toRaw({ type: SerializeType.Set, value: [{ type: SerializeType.Number, value: jsonNumber }] })).toStrictEqual(new Set([rawNumber]));
      });

      test(SerializeType.RegExp, () => {
        expect(toRaw({ type: SerializeType.Set, value: [{ type: SerializeType.RegExp, value: jsonRegExp }] })).toStrictEqual(new Set([rawRegExp]));
      });

      test(SerializeType.String, () => {
        expect(toRaw({ type: SerializeType.Set, value: [{ type: SerializeType.String, value: jsonString }] })).toStrictEqual(new Set([rawString]));
      });

      test(SerializeType.Undefined, () => {
        expect(toRaw({ type: SerializeType.Set, value: [{ type: SerializeType.Undefined, value: jsonUndefined }] })).toStrictEqual(
          new Set([rawUndefined])
        );
      });
    });

    test(SerializeType.String, () => {
      expect(toRaw({ type: SerializeType.String, value: jsonString })).toBe(rawString);
    });

    test(SerializeType.Undefined, () => {
      expect(toRaw({ type: SerializeType.Undefined, value: jsonUndefined })).toBe(rawUndefined);
    });
  });
});
