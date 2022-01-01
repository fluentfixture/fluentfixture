import { truthy, falsy, bool } from '../../src/generators/generators';
import { BooleanStream } from '../../src/streams/stream-loader';
import { ValueAdapter } from '../../src/factories/adapters/value-adapter';
import { BooleanFactory } from '../../src/factories/boolean-factory';
import { DEFAULT_PERCENTAGE } from '../../src/constants/limits';

describe('boolean', () => {

  describe('truthy()', () => {

    it('should create a boolean stream with true', () => {
      const result = truthy();

      const valueAdapter = result.getFactory() as ValueAdapter;

      expect(result).toBeInstanceOf(BooleanStream);
      expect(valueAdapter).toBeInstanceOf(ValueAdapter);
      expect(valueAdapter.getValue()).toBe(true);
    });
  });

  describe('falsy()', () => {

    it('should create a boolean stream with false', () => {
      const result = falsy();

      const valueAdapter = result.getFactory() as ValueAdapter;

      expect(result).toBeInstanceOf(BooleanStream);
      expect(valueAdapter).toBeInstanceOf(ValueAdapter);
      expect(valueAdapter.getValue()).toBe(false);
    });
  });

  describe('bool()', () => {

    it('should create a boolean stream with boolean factory with given percentage', () => {
      const percentage = 0.2;

      const result = bool(percentage);

      const booleanFactory = result.getFactory() as BooleanFactory;

      expect(result).toBeInstanceOf(BooleanStream);
      expect(booleanFactory).toBeInstanceOf(BooleanFactory);
      expect(booleanFactory.getPercentage()).toBe(percentage);
    });

    it('should use default percentage when percentage is not provided', () => {
      const result = bool();

      const booleanFactory = result.getFactory() as BooleanFactory;

      expect(result).toBeInstanceOf(BooleanStream);
      expect(booleanFactory).toBeInstanceOf(BooleanFactory);
      expect(booleanFactory.getPercentage()).toBe(DEFAULT_PERCENTAGE);
    });
  });
});
