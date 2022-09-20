import { Method, Payload } from '../../types';

/**
 * Validates whether the given payload is `Payload.Remove.ByHook`
 * @since 1.0.0
 * @param payload The payload to validate.
 * @returns Validation boolean.
 */
export function isRemoveByHookPayload<Value>(payload: Payload.Remove<Value>): payload is Payload.Remove.ByHook<Value> {
  return payload.method === Method.Remove && payload.type === Payload.Type.Hook;
}

/**
 * Validates whether the given payload is `Payload.Remove.ByValue`
 * @since 1.0.0
 * @param payload The payload to validate.
 * @returns Validation boolean.
 */
export function isRemoveByValuePayload<Value>(payload: Payload.Remove<Value>): payload is Payload.Remove.ByValue {
  return payload.method === Method.Remove && payload.type === Payload.Type.Value;
}
