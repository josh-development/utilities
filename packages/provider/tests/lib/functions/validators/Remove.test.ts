import { isRemoveByHookPayload, isRemoveByValuePayload, Method, Payload } from '../../../../src';

describe('Remove', () => {
  test('GIVEN typeof isRemoveByHookPayload THEN returns function', () => {
    expect(typeof isRemoveByHookPayload).toBe('function');
  });

  test('GIVEN Method.Remove AND Payload.Type.Hook THEN returns true', () => {
    expect(isRemoveByHookPayload({ key: 'key', path: [], errors: [], method: Method.Remove, type: Payload.Type.Hook })).toBe(true);
  });

  test('GIVEN typeof isRemoveByValuePayload THEN returns function', () => {
    expect(typeof isRemoveByValuePayload).toBe('function');
  });

  test('GIVEN Method.Remove AND Payload.Type.Value THEN returns true', () => {
    expect(isRemoveByValuePayload({ key: 'key', path: [], errors: [], method: Method.Remove, type: Payload.Type.Value })).toBe(true);
  });
});
