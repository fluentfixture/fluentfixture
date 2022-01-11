import { or } from '../../src/generators/generators';
import { Selector } from '../../src/factories/selectors/selector';
import { Stream } from '../../src/streams/stream-loader';
import { MockFactory } from '../mocks/mock-factory';
import { DEFAULT_PERCENTAGE } from '../../src/constants/limits';

describe('operators', () => {

  describe('or()', () => {

    it('should create a selector with given factories', () => {
      const left = new MockFactory(1);
      const right = new MockFactory(2);
      const percentage = 0.3;

      const result = or(left, right, percentage);

      const selector = result.getFactory() as Selector;

      expect(result).toBeInstanceOf(Stream);
      expect(selector).toBeInstanceOf(Selector);
      expect(selector.getFactory1()).toBe(left);
      expect(selector.getFactory2()).toBe(right);
      expect(selector.getPercentage()).toBe(percentage);
    });

    it('should use default percentage when percentage is not provided', () => {
      const left = new MockFactory(1);
      const right = new MockFactory(2);

      const result = or(left, right);

      const selector = result.getFactory() as Selector;

      expect(result).toBeInstanceOf(Stream);
      expect(selector).toBeInstanceOf(Selector);
      expect(selector.getFactory1()).toBe(left);
      expect(selector.getFactory2()).toBe(right);
      expect(selector.getPercentage()).toBe(DEFAULT_PERCENTAGE);
    });
  });
});
