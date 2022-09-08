import { isEveryByHookPayload, isEveryByValuePayload, Method, Payload } from '../../../../src';

describe('Every', () => {
  describe('isEveryByHookPayload', () => {
    test('GIVEN typeof isEveryByHookPayload THEN returns function', () => {
      expect(typeof isEveryByHookPayload).toBe('function');
    });

    test('GIVEN Method.Every AND Payload.Type.Hook THEN returns true', () => {
      expect(isEveryByHookPayload({ errors: [], method: Method.Every, type: Payload.Type.Hook })).toBe(true);
    });
  });

  describe('isEveryByValuePayload', () => {
    test('GIVEN typeof isEveryByValuePayload THEN returns function', () => {
      expect(typeof isEveryByValuePayload).toBe('function');
    });

    test('GIVEN Method.Every AND Payload.Type.Value THEN returns true', () => {
      expect(isEveryByValuePayload({ errors: [], method: Method.Every, type: Payload.Type.Value })).toBe(true);
    });
  });
});
