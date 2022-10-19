import { Method, Payload } from '../../types';

/**
 * Validates whether the given payload is `Payload.Filter.ByHook`
 * @since 1.0.0
 * @param payload The payload to validate.
 * @returns Validation boolean.
 */
export function isFilterByHookPayload<StoredValue>(payload: Payload.Filter<StoredValue>): payload is Payload.Filter.ByHook<StoredValue> {
  return payload.method === Method.Filter && payload.type === Payload.Type.Hook;
}

/**
 * Validates whether the given payload is `Payload.Filter.ByValue`
 * @since 1.0.0
 * @param payload The payload to validate.
 * @returns Validation boolean.
 */
export function isFilterByValuePayload<StoredValue>(payload: Payload.Filter<StoredValue>): payload is Payload.Filter.ByValue<StoredValue> {
  return payload.method === Method.Filter && payload.type === Payload.Type.Value;
}
