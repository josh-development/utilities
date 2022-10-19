import { Method, Payload } from '../../types';

/**
 * Validates whether the given payload is `Payload.Map.ByHook`
 * @since 1.0.0
 * @param payload The payload to validate.
 * @returns Validation boolean.
 */
export function isMapByHookPayload<StoredValue, ReturnValue>(
  payload: Payload.Map<StoredValue, ReturnValue>
): payload is Payload.Map.ByHook<StoredValue, ReturnValue> {
  return payload.method === Method.Map && payload.type === Payload.Type.Hook;
}

/**
 * Validates whether the given payload is `Payload.Map.ByPath`
 * @since 1.0.0
 * @param payload The payload to validate.
 * @returns Validation boolean.
 */
export function isMapByPathPayload<StoredValue, ReturnValue>(
  payload: Payload.Map<StoredValue, ReturnValue>
): payload is Payload.Map.ByPath<ReturnValue> {
  return payload.method === Method.Map && payload.type === Payload.Type.Path;
}
