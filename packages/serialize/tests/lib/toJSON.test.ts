import { SerializeType, toJSON } from '../../src';

describe('toJSON', () => {
  test('GIVEN typeof toJSON THEN returns functions', () => {
    expect(typeof toJSON).toBe('function');
  });

  describe('can format raw data', () => {
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
        const { type, value } = toJSON([rawBigInt]);

        expect(type).toBe(SerializeType.Array);
        expect(value).toStrictEqual([{ type: SerializeType.BigInt, value: jsonBigInt }]);
      });

      test(SerializeType.Boolean, () => {
        const { type, value } = toJSON([rawBoolean]);

        expect(type).toBe(SerializeType.Array);
        expect(value).toStrictEqual([{ type: SerializeType.Boolean, value: jsonBoolean }]);
      });

      test(SerializeType.Date, () => {
        const { type, value } = toJSON([rawDate]);

        expect(type).toBe(SerializeType.Array);
        expect(value).toStrictEqual([{ type: SerializeType.Date, value: jsonDate }]);
      });

      test(SerializeType.Null, () => {
        const { type, value } = toJSON([rawNull]);

        expect(type).toBe(SerializeType.Array);
        expect(value).toStrictEqual([{ type: SerializeType.Null, value: jsonNull }]);
      });

      test(SerializeType.Number, () => {
        const { type, value } = toJSON([rawNumber]);

        expect(type).toBe(SerializeType.Array);
        expect(value).toStrictEqual([{ type: SerializeType.Number, value: jsonNumber }]);
      });

      test(SerializeType.RegExp, () => {
        const { type, value } = toJSON([rawRegExp]);

        expect(type).toBe(SerializeType.Array);
        expect(value).toStrictEqual([{ type: SerializeType.RegExp, value: jsonRegExp }]);
      });

      test(SerializeType.String, () => {
        const { type, value } = toJSON([rawString]);

        expect(type).toBe(SerializeType.Array);
        expect(value).toStrictEqual([{ type: SerializeType.String, value: jsonString }]);
      });

      test(SerializeType.Undefined, () => {
        const { type, value } = toJSON([rawUndefined]);

        expect(type).toBe(SerializeType.Array);
        expect(value).toStrictEqual([{ type: SerializeType.Undefined, value: jsonUndefined }]);
      });
    });

    test(SerializeType.BigInt, () => {
      const { type, value } = toJSON(rawBigInt);

      expect(type).toBe(SerializeType.BigInt);
      expect(value).toStrictEqual(jsonBigInt);
    });

    test(SerializeType.Boolean, () => {
      const { type, value } = toJSON(rawBoolean);

      expect(type).toBe(SerializeType.Boolean);
      expect(value).toStrictEqual(jsonBoolean);
    });

    test(SerializeType.Date, () => {
      const { type, value } = toJSON(rawDate);

      expect(type).toBe(SerializeType.Date);
      expect(value).toStrictEqual(jsonDate);
    });

    describe(SerializeType.Map, () => {
      test(SerializeType.BigInt, () => {
        const { type, value } = toJSON(new Map([['test:key', rawBigInt]]));

        expect(type).toBe(SerializeType.Map);
        expect(value).toStrictEqual([['test:key', { type: SerializeType.BigInt, value: jsonBigInt }]]);
      });

      test(SerializeType.Boolean, () => {
        const { type, value } = toJSON(new Map([['test:key', rawBoolean]]));

        expect(type).toBe(SerializeType.Map);
        expect(value).toStrictEqual([['test:key', { type: SerializeType.Boolean, value: jsonBoolean }]]);
      });

      test(SerializeType.Date, () => {
        const { type, value } = toJSON(new Map([['test:key', rawDate]]));

        expect(type).toBe(SerializeType.Map);
        expect(value).toStrictEqual([['test:key', { type: SerializeType.Date, value: jsonDate }]]);
      });

      test(SerializeType.Null, () => {
        const { type, value } = toJSON(new Map([['test:key', rawNull]]));

        expect(type).toBe(SerializeType.Map);
        expect(value).toStrictEqual([['test:key', { type: SerializeType.Null, value: jsonNull }]]);
      });

      test(SerializeType.Number, () => {
        const { type, value } = toJSON(new Map([['test:key', rawNumber]]));

        expect(type).toBe(SerializeType.Map);
        expect(value).toStrictEqual([['test:key', { type: SerializeType.Number, value: jsonNumber }]]);
      });

      test(SerializeType.RegExp, () => {
        const { type, value } = toJSON(new Map([['test:key', rawRegExp]]));

        expect(type).toBe(SerializeType.Map);
        expect(value).toStrictEqual([['test:key', { type: SerializeType.RegExp, value: jsonRegExp }]]);
      });

      test(SerializeType.String, () => {
        const { type, value } = toJSON(new Map([['test:key', rawString]]));

        expect(type).toBe(SerializeType.Map);
        expect(value).toStrictEqual([['test:key', { type: SerializeType.String, value: jsonString }]]);
      });

      test(SerializeType.Undefined, () => {
        const { type, value } = toJSON(new Map([['test:key', rawUndefined]]));

        expect(type).toBe(SerializeType.Map);
        expect(value).toStrictEqual([['test:key', { type: SerializeType.Undefined, value: jsonUndefined }]]);
      });
    });

    test(SerializeType.Null, () => {
      const { type, value } = toJSON(rawNull);

      expect(type).toBe(SerializeType.Null);
      expect(value).toStrictEqual(jsonNull);
    });

    test(SerializeType.Number, () => {
      const { type, value } = toJSON(rawNumber);

      expect(type).toBe(SerializeType.Number);
      expect(value).toStrictEqual(jsonNumber);
    });

    describe(SerializeType.Object, () => {
      test(SerializeType.BigInt, () => {
        const { type, value } = toJSON({ key: rawBigInt });

        expect(type).toBe(SerializeType.Object);
        expect(value).toStrictEqual({ key: { type: SerializeType.BigInt, value: jsonBigInt } });
      });

      test(SerializeType.Boolean, () => {
        const { type, value } = toJSON({ key: rawBoolean });

        expect(type).toBe(SerializeType.Object);
        expect(value).toStrictEqual({ key: { type: SerializeType.Boolean, value: jsonBoolean } });
      });

      test(SerializeType.Date, () => {
        const { type, value } = toJSON({ key: rawDate });

        expect(type).toBe(SerializeType.Object);
        expect(value).toStrictEqual({ key: { type: SerializeType.Date, value: jsonDate } });
      });

      test(SerializeType.Null, () => {
        const { type, value } = toJSON({ key: rawNull });

        expect(type).toBe(SerializeType.Object);
        expect(value).toStrictEqual({ key: { type: SerializeType.Null, value: jsonNull } });
      });

      test(SerializeType.Number, () => {
        const { type, value } = toJSON({ key: rawNumber });

        expect(type).toBe(SerializeType.Object);
        expect(value).toStrictEqual({ key: { type: SerializeType.Number, value: jsonNumber } });
      });

      test(SerializeType.RegExp, () => {
        const { type, value } = toJSON({ key: rawRegExp });

        expect(type).toBe(SerializeType.Object);
        expect(value).toStrictEqual({ key: { type: SerializeType.RegExp, value: jsonRegExp } });
      });

      test(SerializeType.String, () => {
        const { type, value } = toJSON({ key: rawString });

        expect(type).toBe(SerializeType.Object);
        expect(value).toStrictEqual({ key: { type: SerializeType.String, value: jsonString } });
      });

      test(SerializeType.Undefined, () => {
        const { type, value } = toJSON({ key: rawUndefined });

        expect(type).toBe(SerializeType.Object);
        expect(value).toStrictEqual({ key: { type: SerializeType.Undefined, value: jsonUndefined } });
      });
    });

    test(SerializeType.RegExp, () => {
      const { type, value } = toJSON(rawRegExp);

      expect(type).toBe(SerializeType.RegExp);
      expect(value).toStrictEqual(jsonRegExp);
    });

    describe(SerializeType.Set, () => {
      test(SerializeType.BigInt, () => {
        const { type, value } = toJSON(new Set([rawBigInt]));

        expect(type).toBe(SerializeType.Set);
        expect(value).toStrictEqual([{ type: SerializeType.BigInt, value: jsonBigInt }]);
      });

      test(SerializeType.Boolean, () => {
        const { type, value } = toJSON(new Set([rawBoolean]));

        expect(type).toBe(SerializeType.Set);
        expect(value).toStrictEqual([{ type: SerializeType.Boolean, value: jsonBoolean }]);
      });

      test(SerializeType.Date, () => {
        const { type, value } = toJSON(new Set([rawDate]));

        expect(type).toBe(SerializeType.Set);
        expect(value).toStrictEqual([{ type: SerializeType.Date, value: jsonDate }]);
      });

      test(SerializeType.Null, () => {
        const { type, value } = toJSON(new Set([rawNull]));

        expect(type).toBe(SerializeType.Set);
        expect(value).toStrictEqual([{ type: SerializeType.Null, value: jsonNull }]);
      });

      test(SerializeType.Number, () => {
        const { type, value } = toJSON(new Set([rawNumber]));

        expect(type).toBe(SerializeType.Set);
        expect(value).toStrictEqual([{ type: SerializeType.Number, value: jsonNumber }]);
      });

      test(SerializeType.RegExp, () => {
        const { type, value } = toJSON(new Set([rawRegExp]));

        expect(type).toBe(SerializeType.Set);
        expect(value).toStrictEqual([{ type: SerializeType.RegExp, value: jsonRegExp }]);
      });

      test(SerializeType.String, () => {
        const { type, value } = toJSON(new Set([rawString]));

        expect(type).toBe(SerializeType.Set);
        expect(value).toStrictEqual([{ type: SerializeType.String, value: jsonString }]);
      });

      test(SerializeType.Undefined, () => {
        const { type, value } = toJSON(new Set([rawUndefined]));

        expect(type).toBe(SerializeType.Set);
        expect(value).toStrictEqual([{ type: SerializeType.Undefined, value: jsonUndefined }]);
      });
    });

    test(SerializeType.String, () => {
      const { type, value } = toJSON(rawString);

      expect(type).toBe(SerializeType.String);
      expect(value).toStrictEqual(jsonString);
    });

    test(SerializeType.Undefined, () => {
      const { type, value } = toJSON(rawUndefined);

      expect(type).toBe(SerializeType.Undefined);
      expect(value).toStrictEqual(jsonUndefined);
    });
  });
});
