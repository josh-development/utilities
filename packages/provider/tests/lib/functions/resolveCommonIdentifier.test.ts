import { CommonIdentifiers, resolveCommonIdentifier } from '../../../src';

describe('resolveCommonIdentifier', () => {
  test('GIVEN typeof resolveCommonIdentifier THEN returns function', () => {
    expect(typeof resolveCommonIdentifier).toBe('function');
  });

  describe('can resolve common identifiers', () => {
    test('GIVEN CommonIdentifiers.InvalidCount THEN returns resolved identifier message', () => {
      expect(resolveCommonIdentifier(CommonIdentifiers.InvalidCount)).toBe(
        'The "count" of items must be less than or equal to the amount of items in the provider.'
      );
    });

    test('GIVEN CommonIdentifiers.InvalidDataType THEN returns resolved identifier message', () => {
      expect(resolveCommonIdentifier(CommonIdentifiers.InvalidDataType, { key: 'key', type: 'number' })).toBe(
        `The data at "key" is invalid. Expected type: NUMBER`
      );

      expect(resolveCommonIdentifier(CommonIdentifiers.InvalidDataType, { key: 'key', path: ['path'], type: 'number' })).toBe(
        `The data at "key.path" is invalid. Expected type: NUMBER`
      );
    });

    test('GIVEN CommonIdentifiers.InvalidDataType w/o metadata THEN returns null', () => {
      expect(resolveCommonIdentifier(CommonIdentifiers.InvalidDataType)).toBe(null);

      expect(resolveCommonIdentifier(CommonIdentifiers.InvalidDataType, { type: 'number' })).toBe(null);
      expect(resolveCommonIdentifier(CommonIdentifiers.InvalidDataType, { key: 'key', path: 'notAPath', type: 'number' })).toBe(null);
      expect(resolveCommonIdentifier(CommonIdentifiers.InvalidDataType, { key: 'key' })).toBe(null);
    });

    test('GIVEN CommonIdentifiers.InvalidValueType THEN returns resolved identifier message', () => {
      expect(resolveCommonIdentifier(CommonIdentifiers.InvalidValueType, { type: 'number' })).toBe(
        `The "value" parameter is invalid. Expected type: NUMBER`
      );
    });

    test('GIVEN CommonIdentifiers.InvalidValueType w/o metadata THEN returns null', () => {
      expect(resolveCommonIdentifier(CommonIdentifiers.InvalidValueType)).toBe(null);
    });

    test('GIVEN CommonIdentifiers.MissingData THEN returns resolved identifier message', () => {
      expect(resolveCommonIdentifier(CommonIdentifiers.MissingData, { key: 'key' })).toBe(`The data at "key" does not exist.`);

      expect(resolveCommonIdentifier(CommonIdentifiers.MissingData, { key: 'key', path: ['path'] })).toBe(`The data at "key.path" does not exist.`);
    });

    test('GIVEN CommonIdentifiers.MissingData w/o metadata THEN returns null', () => {
      expect(resolveCommonIdentifier(CommonIdentifiers.MissingData)).toBe(null);

      expect(resolveCommonIdentifier(CommonIdentifiers.MissingData, { key: 'key', path: 'notAPath' })).toBe(null);
    });

    test('GIVEN CommonIdentifiers.MissingValue THEN returns resolved identifier message', () => {
      expect(resolveCommonIdentifier(CommonIdentifiers.MissingValue)).toBe('The "value" parameter was not found.');
    });

    test('GIVEN unknown identifier THEN returns null', () => {
      expect(resolveCommonIdentifier('unknown')).toBeNull();
    });
  });
});
