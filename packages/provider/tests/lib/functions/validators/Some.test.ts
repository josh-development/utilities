import { isSomeByHookPayload, isSomeByValuePayload, Method, Payload } from '../../../../src';

describe('Some', () => {
  describe('isSomeByHookPayload', () => {
    test('GIVEN typeof isSomeByHookPayload THEN returns function', () => {
      expect(typeof isSomeByHookPayload).toBe('function');
    });

    test('GIVEN Method.Some AND Payload.Type.Hook THEN returns true', () => {
      expect(isSomeByHookPayload({ errors: [], method: Method.Some, type: Payload.Type.Hook })).toBe(true);
    });
  });

  describe('isSomeByValuePayload', () => {
    test('GIVEN typeof isSomeByValuePayload THEN returns function', () => {
      expect(typeof isSomeByValuePayload).toBe('function');
    });

    test('GIVEN Method.Some AND Payload.Type.Value THEN returns true', () => {
      expect(isSomeByValuePayload({ errors: [], method: Method.Some, type: Payload.Type.Value })).toBe(true);
    });
  });
});
