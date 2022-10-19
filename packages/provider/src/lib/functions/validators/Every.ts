import { Method, Payload } from '../../types';

/**
 * Validates whether the given payload is `Payload.Every.ByHook`
 * @since 1.0.0
 * @param payload The payload to validate.
 * @returns Validation boolean.
 */
export function isEveryByHookPayload<StoredValue>(payload: Payload.Every<StoredValue>): payload is Payload.Every.ByHook<StoredValue> {
  return payload.method === Method.Every && payload.type === Payload.Type.Hook;
}

/**
 * Validates whether the given payload is `Payload.Every.ByValue`
 * @since 1.0.0
 * @param payload The payload to validate.
 * @returns Validation boolean.
 */
export function isEveryByValuePayload<StoredPayload>(payload: Payload.Every<StoredPayload>): payload is Payload.Every.ByValue {
  return payload.method === Method.Every && payload.type === Payload.Type.Value;
}
