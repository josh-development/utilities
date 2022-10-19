import type { Payload } from '../../types';

/**
 * Validates whether the given payload has the `data` property.
 * @since 1.0.0
 * @param payload The payload to validate.
 * @returns Validation boolean.
 */
export function isPayloadWithData<Value>(payload: Payload): payload is Payload.WithData<Value> {
  return 'data' in payload;
}
