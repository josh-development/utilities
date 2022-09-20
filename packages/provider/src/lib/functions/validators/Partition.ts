import { Method, Payload } from '../../types';

/**
 * Validates whether the given payload is `Payload.Partition.ByHook`
 * @since 1.0.0
 * @param payload The payload to validate.
 * @returns Validation boolean.
 */
export function isPartitionByHookPayload<StoredValue>(payload: Payload.Partition<StoredValue>): payload is Payload.Partition.ByHook<StoredValue> {
  return payload.method === Method.Partition && payload.type === Payload.Type.Hook;
}

/**
 * Validates whether the given payload is `Payload.Partition.ByValue`
 * @since 1.0.0
 * @param payload The payload to validate.
 * @returns Validation boolean.
 */
export function isPartitionByValuePayload<StoredValue>(payload: Payload.Partition<StoredValue>): payload is Payload.Partition.ByValue<StoredValue> {
  return payload.method === Method.Partition && payload.type === Payload.Type.Value;
}
