import { Method, Payload } from '../../types';

/**
 * Validates whether the given payload is `Payload.Find.ByHook`
 * @since 1.0.0
 * @param payload The payload to validate.
 * @returns Validation boolean.
 */
export function isFindByHookPayload<StoredValue>(payload: Payload.Find<StoredValue>): payload is Payload.Find.ByHook<StoredValue> {
  return payload.method === Method.Find && payload.type === Payload.Type.Hook;
}

/**
 * Validates whether the given payload is `Payload.Find.ByValue`
 * @since 1.0.0
 * @param payload The payload to validate.
 * @returns Validation boolean.
 */
export function isFindByValuePayload<StoredValue>(payload: Payload.Find<StoredValue>): payload is Payload.Find.ByValue<StoredValue> {
  return payload.method === Method.Find && payload.type === Payload.Type.Value;
}
