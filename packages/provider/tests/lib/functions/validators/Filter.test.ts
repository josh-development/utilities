import { isFilterByHookPayload, isFilterByValuePayload, Method, Payload } from '../../../../src';

describe('Filter', () => {
  describe('isFilterByHookPayload', () => {
    test('GIVEN typeof isFilterByHookPayload THEN returns function', () => {
      expect(typeof isFilterByHookPayload).toBe('function');
    });

    test('GIVEN Method.Filter AND Payload.Type.Hook THEN returns true', () => {
      expect(isFilterByHookPayload({ errors: [], method: Method.Filter, type: Payload.Type.Hook })).toBe(true);
    });
  });

  describe('isFilterByValuePayload', () => {
    test('GIVEN typeof isFilterByValuePayload THEN returns function', () => {
      expect(typeof isFilterByValuePayload).toBe('function');
    });

    test('GIVEN Method.Filter AND Payload.Type.Value THEN returns true', () => {
      expect(isFilterByValuePayload({ errors: [], method: Method.Filter, type: Payload.Type.Value })).toBe(true);
    });
  });
});
