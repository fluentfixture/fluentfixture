import { zero, one, num, int } from '../../src/generators/generators';
import { ValueAdapter } from '../../src/factories/adapters/value-adapter';
import { NumberStream } from '../../src/streams/stream-loader';
import { NumberFactory } from '../../src/factories/number-factory';
import { IntegerFactory } from '../../src/factories/integer-factory';
import { DEFAULT_MAX_NUMBER, DEFAULT_MIN_NUMBER } from '../../src/constants/limits';

describe('number', () => {

  describe('num()', () => {

    it('should create a number stream with number factory with given min and max values', () => {
      const min = 1;
      const max = 2;
      const result = num(min, max);
      const numberFactory = result.getFactory() as NumberFactory;

      expect(result).toBeInstanceOf(NumberStream);
      expect(numberFactory).toBeInstanceOf(NumberFactory);
      expect(numberFactory.getMin()).toBe(min);
      expect(numberFactory.getMax()).toBe(max);
    });

    it('should use default max value when max is not provided', () => {
      const min = 1;
      const result = num(min);
      const numberFactory = result.getFactory() as NumberFactory;

      expect(result).toBeInstanceOf(NumberStream);
      expect(numberFactory).toBeInstanceOf(NumberFactory);
      expect(numberFactory.getMin()).toBe(min);
      expect(numberFactory.getMax()).toBe(DEFAULT_MAX_NUMBER);
    });

    it('should use default min and max value when min and max are not provided', () => {
      const result = num();
      const numberFactory = result.getFactory() as NumberFactory;

      expect(result).toBeInstanceOf(NumberStream);
      expect(numberFactory).toBeInstanceOf(NumberFactory);
      expect(numberFactory.getMin()).toBe(DEFAULT_MIN_NUMBER);
      expect(numberFactory.getMax()).toBe(DEFAULT_MAX_NUMBER);
    });
  });

  describe('int()', () => {

    it('should create a number stream with integer factory with given min and max values', () => {
      const min = 1;
      const max = 2;
      const result = int(min, max);
      const integerFactory = result.getFactory() as IntegerFactory;

      expect(result).toBeInstanceOf(NumberStream);
      expect(integerFactory).toBeInstanceOf(IntegerFactory);
      expect(integerFactory.getMin()).toBe(min);
      expect(integerFactory.getMax()).toBe(max);
    });

    it('should use default max value when max is not provided', () => {
      const min = 1;
      const result = int(min);
      const integerFactory = result.getFactory() as IntegerFactory;

      expect(result).toBeInstanceOf(NumberStream);
      expect(integerFactory).toBeInstanceOf(IntegerFactory);
      expect(integerFactory.getMin()).toBe(min);
      expect(integerFactory.getMax()).toBe(DEFAULT_MAX_NUMBER);
    });

    it('should use default min and max value when min and max are not provided', () => {
      const result = int();
      const integerFactory = result.getFactory() as IntegerFactory;

      expect(result).toBeInstanceOf(NumberStream);
      expect(integerFactory).toBeInstanceOf(IntegerFactory);
      expect(integerFactory.getMin()).toBe(DEFAULT_MIN_NUMBER);
      expect(integerFactory.getMax()).toBe(DEFAULT_MAX_NUMBER);
    });
  });

  describe('zero()', () => {

    it('should create a number stream with given zero', () => {
      const result = zero();
      const valueAdapter = result.getFactory() as ValueAdapter;

      expect(result).toBeInstanceOf(NumberStream);
      expect(valueAdapter).toBeInstanceOf(ValueAdapter);
      expect(valueAdapter.getValue()).toBe(0);
    });
  });

  describe('one()', () => {

    it('should create a number stream with given zero', () => {
      const result = one();
      const valueAdapter = result.getFactory() as ValueAdapter;

      expect(result).toBeInstanceOf(NumberStream);
      expect(valueAdapter).toBeInstanceOf(ValueAdapter);
      expect(valueAdapter.getValue()).toBe(1);
    });
  });
});
