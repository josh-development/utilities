import { version } from '../src';

test('version is string', () => {
  expect(typeof version).toBe('string');
});
