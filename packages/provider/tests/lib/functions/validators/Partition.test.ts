import { isPartitionByHookPayload, isPartitionByValuePayload, Method, Payload } from '../../../../src';

describe('Partition', () => {
  describe('isPartitionByHookPayload', () => {
    test('GIVEN typeof isPartitionByHookPayload THEN returns function', () => {
      expect(typeof isPartitionByHookPayload).toBe('function');
    });

    test('GIVEN Method.Partition AND Payload.Type.Hook THEN returns true', () => {
      expect(isPartitionByHookPayload({ errors: [], method: Method.Partition, type: Payload.Type.Hook })).toBe(true);
    });
  });

  describe('isPartitionByValuePayload', () => {
    test('GIVEN typeof isPartitionByValuePayload THEN returns function', () => {
      expect(typeof isPartitionByValuePayload).toBe('function');
    });

    test('GIVEN Method.Partition AND Payload.Type.Value THEN returns true', () => {
      expect(isPartitionByValuePayload({ errors: [], method: Method.Partition, type: Payload.Type.Value })).toBe(true);
    });
  });
});
