import { isMapByHookPayload, isMapByPathPayload, Method, Payload } from '../../../../src';

describe('Map', () => {
  describe('isMapByHookPayload', () => {
    test('GIVEN typeof isMapByHookPayload THEN returns function', () => {
      expect(typeof isMapByHookPayload).toBe('function');
    });

    test('GIVEN Method.Map AND Payload.Type.Hook THEN returns true', () => {
      expect(isMapByHookPayload({ errors: [], method: Method.Map, type: Payload.Type.Hook })).toBe(true);
    });
  });

  describe('isMapByPathPayload', () => {
    test('GIVEN typeof isMapByPathPayload THEN returns function', () => {
      expect(typeof isMapByPathPayload).toBe('function');
    });

    test('GIVEN Method.Map AND Payload.Type.Path THEN returns true', () => {
      expect(isMapByPathPayload({ errors: [], method: Method.Map, type: Payload.Type.Path })).toBe(true);
    });
  });
});
