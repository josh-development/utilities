import { isFindByHookPayload, isFindByValuePayload, Method, Payload } from '../../../../src';

describe('Find', () => {
  describe('isFindByHookPayload', () => {
    test('GIVEN typeof isFindByHookPayload THEN returns function', () => {
      expect(typeof isFindByHookPayload).toBe('function');
    });

    test('GIVEN Method.Find AND Payload.Type.Hook THEN returns true', () => {
      expect(isFindByHookPayload({ errors: [], method: Method.Find, type: Payload.Type.Hook })).toBe(true);
    });
  });

  describe('isFindByValuePayload', () => {
    test('GIVEN typeof isFindByValuePayload THEN returns function', () => {
      expect(typeof isFindByValuePayload).toBe('function');
    });

    test('GIVEN Method.Find AND Payload.Type.Value THEN returns true', () => {
      expect(isFindByValuePayload({ errors: [], method: Method.Find, type: Payload.Type.Value })).toBe(true);
    });
  });
});
