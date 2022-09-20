import { Method, Payload } from '../../types';

/**
 * Validates whether the given payload is `SomeByHookPayload`
 * @since 1.0.0
 * @param payload The payload to validate.
 * @returns Validation boolean.
 */
export function isSomeByHookPayload<StoredValue>(payload: Payload.Some<StoredValue>): payload is Payload.Some.ByHook<StoredValue> {
  return payload.method === Method.Some && payload.type === Payload.Type.Hook;
}

/**
 * Validates whether the given payload is `SomeByValuePayload`
 * @since 1.0.0
 * @param payload The payload to validate.
 * @returns Validation boolean.
 */
export function isSomeByValuePayload<StoredValue>(payload: Payload.Some<StoredValue>): payload is Payload.Some.ByValue {
  return payload.method === Method.Some && payload.type === Payload.Type.Value;
}
