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
  const jsonRegExp = { 0: rawRegExp.source, 1: rawRegExp.flags };
  const jsonString = rawString;
  const jsonUndefined = `${rawUndefined}`;

  describe('Serialize.toJSON', () => {
    test('GIVEN typeof toJSON THEN returns functions', () => {
      expect(typeof Serialize.toJSON).toBe('function');
    });

    describe('can format raw data', () => {
      describe(Serialize.Type.Array.toString(), () => {
        test(Serialize.Type.BigInt.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON([rawBigInt]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ t: Serialize.Type.BigInt, v: jsonBigInt }]);
        });

        test(Serialize.Type.Boolean.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON([rawBoolean]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ t: Serialize.Type.Boolean, v: jsonBoolean }]);
        });

        test(Serialize.Type.Date.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON([rawDate]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ t: Serialize.Type.Date, v: jsonDate }]);
        });

        test(Serialize.Type.Null.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON([rawNull]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ t: Serialize.Type.Null, v: jsonNull }]);
        });

        test(Serialize.Type.Number.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON([rawNumber]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ t: Serialize.Type.Number, v: jsonNumber }]);
        });

        test(Serialize.Type.RegExp.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON([rawRegExp]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ t: Serialize.Type.RegExp, v: jsonRegExp }]);
        });

        test(Serialize.Type.String.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON([rawString]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ t: Serialize.Type.String, v: jsonString }]);
        });

        test(Serialize.Type.Undefined.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON([rawUndefined]);

          expect(type).toBe(Serialize.Type.Array);
          expect(value).toStrictEqual([{ t: Serialize.Type.Undefined, v: jsonUndefined }]);
        });
      });

      test(Serialize.Type.BigInt.toString(), () => {
        const { t: type, v: value } = Serialize.toJSON(rawBigInt);

        expect(type).toBe(Serialize.Type.BigInt);
        expect(value).toStrictEqual(jsonBigInt);
      });

      test(Serialize.Type.Boolean.toString(), () => {
        const { t: type, v: value } = Serialize.toJSON(rawBoolean);

        expect(type).toBe(Serialize.Type.Boolean);
        expect(value).toStrictEqual(jsonBoolean);
      });

      test(Serialize.Type.Date.toString(), () => {
        const { t: type, v: value } = Serialize.toJSON(rawDate);

        expect(type).toBe(Serialize.Type.Date);
        expect(value).toStrictEqual(jsonDate);
      });

      describe(Serialize.Type.Map.toString(), () => {
        test(Serialize.Type.BigInt.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON(new Map([['key', rawBigInt]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { t: Serialize.Type.BigInt, v: jsonBigInt }]]);
        });

        test(Serialize.Type.Boolean.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON(new Map([['key', rawBoolean]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { t: Serialize.Type.Boolean, v: jsonBoolean }]]);
        });

        test(Serialize.Type.Date.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON(new Map([['key', rawDate]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { t: Serialize.Type.Date, v: jsonDate }]]);
        });

        test(Serialize.Type.Null.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON(new Map([['key', rawNull]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { t: Serialize.Type.Null, v: jsonNull }]]);
        });

        test(Serialize.Type.Number.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON(new Map([['key', rawNumber]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { t: Serialize.Type.Number, v: jsonNumber }]]);
        });

        test(Serialize.Type.RegExp.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON(new Map([['key', rawRegExp]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { t: Serialize.Type.RegExp, v: jsonRegExp }]]);
        });

        test(Serialize.Type.String.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON(new Map([['key', rawString]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { t: Serialize.Type.String, v: jsonString }]]);
        });

        test(Serialize.Type.Undefined.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON(new Map([['key', rawUndefined]]));

          expect(type).toBe(Serialize.Type.Map);
          expect(value).toStrictEqual([['key', { t: Serialize.Type.Undefined, v: jsonUndefined }]]);
        });
      });

      test(Serialize.Type.Null.toString(), () => {
        const { t: type, v: value } = Serialize.toJSON(rawNull);

        expect(type).toBe(Serialize.Type.Null);
        expect(value).toStrictEqual(jsonNull);
      });

      test(Serialize.Type.Number.toString(), () => {
        const { t: type, v: value } = Serialize.toJSON(rawNumber);

        expect(type).toBe(Serialize.Type.Number);
        expect(value).toStrictEqual(jsonNumber);
      });

      describe(Serialize.Type.Object.toString(), () => {
        test(Serialize.Type.BigInt.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON({ key: rawBigInt });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { t: Serialize.Type.BigInt, v: jsonBigInt } });
        });

        test(Serialize.Type.Boolean.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON({ key: rawBoolean });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { t: Serialize.Type.Boolean, v: jsonBoolean } });
        });

        test(Serialize.Type.Date.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON({ key: rawDate });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { t: Serialize.Type.Date, v: jsonDate } });
        });

        test(Serialize.Type.Null.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON({ key: rawNull });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { t: Serialize.Type.Null, v: jsonNull } });
        });

        test(Serialize.Type.Number.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON({ key: rawNumber });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { t: Serialize.Type.Number, v: jsonNumber } });
        });

        test(Serialize.Type.RegExp.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON({ key: rawRegExp });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { t: Serialize.Type.RegExp, v: jsonRegExp } });
        });

        test(Serialize.Type.String.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON({ key: rawString });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { t: Serialize.Type.String, v: jsonString } });
        });

        test(Serialize.Type.Undefined.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON({ key: rawUndefined });

          expect(type).toBe(Serialize.Type.Object);
          expect(value).toStrictEqual({ key: { t: Serialize.Type.Undefined, v: jsonUndefined } });
        });
      });

      test(Serialize.Type.RegExp.toString(), () => {
        const { t: type, v: value } = Serialize.toJSON(rawRegExp);

        expect(type).toBe(Serialize.Type.RegExp);
        expect(value).toStrictEqual(jsonRegExp);
      });

      describe(Serialize.Type.Set.toString(), () => {
        test(Serialize.Type.BigInt.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON(new Set([rawBigInt]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ t: Serialize.Type.BigInt, v: jsonBigInt }]);
        });

        test(Serialize.Type.Boolean.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON(new Set([rawBoolean]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ t: Serialize.Type.Boolean, v: jsonBoolean }]);
        });

        test(Serialize.Type.Date.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON(new Set([rawDate]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ t: Serialize.Type.Date, v: jsonDate }]);
        });

        test(Serialize.Type.Null.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON(new Set([rawNull]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ t: Serialize.Type.Null, v: jsonNull }]);
        });

        test(Serialize.Type.Number.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON(new Set([rawNumber]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ t: Serialize.Type.Number, v: jsonNumber }]);
        });

        test(Serialize.Type.RegExp.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON(new Set([rawRegExp]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ t: Serialize.Type.RegExp, v: jsonRegExp }]);
        });

        test(Serialize.Type.String.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON(new Set([rawString]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ t: Serialize.Type.String, v: jsonString }]);
        });

        test(Serialize.Type.Undefined.toString(), () => {
          const { t: type, v: value } = Serialize.toJSON(new Set([rawUndefined]));

          expect(type).toBe(Serialize.Type.Set);
          expect(value).toStrictEqual([{ t: Serialize.Type.Undefined, v: jsonUndefined }]);
        });
      });

      test(Serialize.Type.String.toString(), () => {
        const { t: type, v: value } = Serialize.toJSON(rawString);

        expect(type).toBe(Serialize.Type.String);
        expect(value).toStrictEqual(jsonString);
      });

      test(Serialize.Type.Undefined.toString(), () => {
        const { t: type, v: value } = Serialize.toJSON(rawUndefined);

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
      describe(Serialize.Type.Array.toString(), () => {
        test(Serialize.Type.BigInt.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Array, v: [{ t: Serialize.Type.BigInt, v: jsonBigInt }] })).toStrictEqual([rawBigInt]);
        });

        test(Serialize.Type.Boolean.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Array, v: [{ t: Serialize.Type.Boolean, v: jsonBoolean }] })).toStrictEqual([rawBoolean]);
        });

        test(Serialize.Type.Date.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Array, v: [{ t: Serialize.Type.Date, v: jsonDate }] })).toStrictEqual([rawDate]);
        });

        test(Serialize.Type.Null.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Array, v: [{ t: Serialize.Type.Null, v: jsonNull }] })).toStrictEqual([rawNull]);
        });

        test(Serialize.Type.Number.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Array, v: [{ t: Serialize.Type.Number, v: jsonNumber }] })).toStrictEqual([rawNumber]);
        });

        test(Serialize.Type.RegExp.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Array, v: [{ t: Serialize.Type.RegExp, v: jsonRegExp }] })).toStrictEqual([rawRegExp]);
        });

        test(Serialize.Type.String.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Array, v: [{ t: Serialize.Type.String, v: jsonString }] })).toStrictEqual([rawString]);
        });

        test(Serialize.Type.Undefined.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Array, v: [{ t: Serialize.Type.Undefined, v: jsonUndefined }] })).toStrictEqual([
            rawUndefined
          ]);
        });
      });

      test(Serialize.Type.BigInt.toString(), () => {
        expect(Serialize.fromJSON({ t: Serialize.Type.BigInt, v: jsonBigInt })).toBe(rawBigInt);
      });

      test(Serialize.Type.Boolean.toString(), () => {
        expect(Serialize.fromJSON({ t: Serialize.Type.Boolean, v: jsonBoolean })).toBe(rawBoolean);
      });

      test(Serialize.Type.Date.toString(), () => {
        expect(Serialize.fromJSON({ t: Serialize.Type.Date, v: jsonDate })).toStrictEqual(rawDate);
      });

      describe(Serialize.Type.Map.toString(), () => {
        test(Serialize.Type.BigInt.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Map, v: [['key', { t: Serialize.Type.BigInt, v: jsonBigInt }]] })).toStrictEqual(
            new Map([['key', rawBigInt]])
          );
        });

        test(Serialize.Type.Boolean.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Map, v: [['key', { t: Serialize.Type.Boolean, v: jsonBoolean }]] })).toStrictEqual(
            new Map([['key', rawBoolean]])
          );
        });

        test(Serialize.Type.Date.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Map, v: [['key', { t: Serialize.Type.Date, v: jsonDate }]] })).toStrictEqual(
            new Map([['key', rawDate]])
          );
        });

        test(Serialize.Type.Null.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Map, v: [['key', { t: Serialize.Type.Null, v: jsonNull }]] })).toStrictEqual(
            new Map([['key', rawNull]])
          );
        });

        test(Serialize.Type.Number.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Map, v: [['key', { t: Serialize.Type.Number, v: jsonNumber }]] })).toStrictEqual(
            new Map([['key', rawNumber]])
          );
        });

        test(Serialize.Type.RegExp.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Map, v: [['key', { t: Serialize.Type.RegExp, v: jsonRegExp }]] })).toStrictEqual(
            new Map([['key', rawRegExp]])
          );
        });

        test(Serialize.Type.String.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Map, v: [['key', { t: Serialize.Type.String, v: jsonString }]] })).toStrictEqual(
            new Map([['key', rawString]])
          );
        });

        test(Serialize.Type.Undefined.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Map, v: [['key', { t: Serialize.Type.Undefined, v: jsonUndefined }]] })).toStrictEqual(
            new Map([['key', rawUndefined]])
          );
        });
      });

      test(Serialize.Type.Null.toString(), () => {
        expect(Serialize.fromJSON({ t: Serialize.Type.Null, v: jsonNull })).toBe(rawNull);
      });

      test(Serialize.Type.Number.toString(), () => {
        expect(Serialize.fromJSON({ t: Serialize.Type.Number, v: jsonNumber })).toBe(rawNumber);
      });

      describe(Serialize.Type.Object.toString(), () => {
        test(Serialize.Type.BigInt.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Object, v: { key: { t: Serialize.Type.BigInt, v: jsonBigInt } } })).toStrictEqual({
            key: rawBigInt
          });
        });

        test(Serialize.Type.Boolean.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Object, v: { key: { t: Serialize.Type.Boolean, v: jsonBoolean } } })).toStrictEqual({
            key: rawBoolean
          });
        });

        test(Serialize.Type.Date.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Object, v: { key: { t: Serialize.Type.Date, v: jsonDate } } })).toStrictEqual({
            key: rawDate
          });
        });

        test(Serialize.Type.Null.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Object, v: { key: { t: Serialize.Type.Null, v: jsonNull } } })).toStrictEqual({
            key: rawNull
          });
        });

        test(Serialize.Type.Number.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Object, v: { key: { t: Serialize.Type.Number, v: jsonNumber } } })).toStrictEqual({
            key: rawNumber
          });
        });

        test(Serialize.Type.RegExp.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Object, v: { key: { t: Serialize.Type.RegExp, v: jsonRegExp } } })).toStrictEqual({
            key: rawRegExp
          });
        });

        test(Serialize.Type.String.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Object, v: { key: { t: Serialize.Type.String, v: jsonString } } })).toStrictEqual({
            key: rawString
          });
        });

        test(Serialize.Type.Undefined.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Object, v: { key: { t: Serialize.Type.Undefined, v: jsonUndefined } } })).toStrictEqual({
            key: rawUndefined
          });
        });
      });

      test(Serialize.Type.RegExp.toString(), () => {
        expect(Serialize.fromJSON({ t: Serialize.Type.RegExp, v: jsonRegExp })).toStrictEqual(rawRegExp);
      });

      describe(Serialize.Type.Set.toString(), () => {
        test(Serialize.Type.BigInt.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Set, v: [{ t: Serialize.Type.BigInt, v: jsonBigInt }] })).toStrictEqual(new Set([rawBigInt]));
        });

        test(Serialize.Type.Boolean.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Set, v: [{ t: Serialize.Type.Boolean, v: jsonBoolean }] })).toStrictEqual(
            new Set([rawBoolean])
          );
        });

        test(Serialize.Type.Date.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Set, v: [{ t: Serialize.Type.Date, v: jsonDate }] })).toStrictEqual(new Set([rawDate]));
        });

        test(Serialize.Type.Null.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Set, v: [{ t: Serialize.Type.Null, v: jsonNull }] })).toStrictEqual(new Set([rawNull]));
        });

        test(Serialize.Type.Number.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Set, v: [{ t: Serialize.Type.Number, v: jsonNumber }] })).toStrictEqual(new Set([rawNumber]));
        });

        test(Serialize.Type.RegExp.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Set, v: [{ t: Serialize.Type.RegExp, v: jsonRegExp }] })).toStrictEqual(new Set([rawRegExp]));
        });

        test(Serialize.Type.String.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Set, v: [{ t: Serialize.Type.String, v: jsonString }] })).toStrictEqual(new Set([rawString]));
        });

        test(Serialize.Type.Undefined.toString(), () => {
          expect(Serialize.fromJSON({ t: Serialize.Type.Set, v: [{ t: Serialize.Type.Undefined, v: jsonUndefined }] })).toStrictEqual(
            new Set([rawUndefined])
          );
        });
      });

      test(Serialize.Type.String.toString(), () => {
        expect(Serialize.fromJSON({ t: Serialize.Type.String, v: jsonString })).toBe(rawString);
      });

      test(Serialize.Type.Undefined.toString(), () => {
        expect(Serialize.fromJSON({ t: Serialize.Type.Undefined, v: jsonUndefined })).toBe(rawUndefined);
      });
    });

    test('GIVEN unknown type THEN throws error', () => {
      // @ts-expect-error 2322 - Type 'function' is not assignable to type 'Serialize.Type'.
      expect(() => Serialize.fromJSON({ t: 'function' })).toThrowError('Serialize received an unknown type.');
    });
  });
});

console.log(JSON.stringify(Serialize.toJSON({ test: true, foo: 'bar', hello: RegExp(/a/), date: new Date() })));
