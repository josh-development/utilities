import { JoshMiddlewareStore } from '../../../src';

describe('JoshMiddlewareStore', () => {
  describe('is a class', () => {
    test('GIVEN typeof JoshMiddlewareStore THEN returns function', () => {
      expect(typeof JoshMiddlewareStore).toBe('function');
    });

    test('GIVEN typeof ...prototype THEN returns object', () => {
      expect(typeof JoshMiddlewareStore.prototype).toBe('object');
    });
  });
});
