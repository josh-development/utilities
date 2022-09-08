import { isPayloadWithData, Method, Payload } from '../../../../src';

describe('WithData', () => {
  test('GIVEN typeof isPayloadWithData THEN returns function', () => {
    expect(typeof isPayloadWithData).toBe('function');
  });

  test('GIVEN payload w/ data property THEN returns true', () => {
    expect(isPayloadWithData({ method: Method.Get, errors: [], data: 'value' } as Payload)).toBe(true);
  });

  test('GIVEN payload w/o data property THEN returns false', () => {
    expect(isPayloadWithData({ method: Method.Get, errors: [] } as Payload)).toBe(false);
  });
});
