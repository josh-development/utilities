import { JoshMiddleware } from '../../../src';

describe('JoshMiddleware', () => {
  describe('is a class', () => {
    test('GIVEN typeof JoshMiddleware THEN returns function', () => {
      expect(typeof JoshMiddleware).toBe('function');
    });

    test('GIVEN typeof ...prototype THEN returns object', () => {
      expect(typeof JoshMiddleware.prototype).toBe('object');
    });
  });
});
