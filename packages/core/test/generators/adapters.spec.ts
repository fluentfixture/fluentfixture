import { val, nil, undef, from } from '../../src/generators/generators';
import { ValueAdapter } from '../../src/factories/adapters/value-adapter';
import { FunctionAdapter } from '../../src/factories/adapters/function-adapter';
import { Stream } from '../../src/streams/stream-loader';

describe('adapters', () => {

  describe('val()', () => {

    it('should create a value stream with given value', () => {
      const value = { };
      const result = val(value);
      const valueAdapter = result.getFactory() as ValueAdapter;

      expect(result).toBeInstanceOf(Stream);
      expect(valueAdapter).toBeInstanceOf(ValueAdapter);
      expect(valueAdapter.getValue()).toBe(value);
    });
  });

  describe('nil()', () => {

    it('should create a value stream with null', () => {
      const result = nil();
      const valueAdapter = result.getFactory() as ValueAdapter;

      expect(result).toBeInstanceOf(Stream);
      expect(valueAdapter).toBeInstanceOf(ValueAdapter);
      expect(valueAdapter.getValue()).toBe(null);
    });
  });

  describe('undef()', () => {

    it('should create a value stream with undefined', () => {
      const result = undef();
      const valueAdapter = result.getFactory() as ValueAdapter;

      expect(result).toBeInstanceOf(Stream);
      expect(valueAdapter).toBeInstanceOf(ValueAdapter);
      expect(valueAdapter.getValue()).toBe(undefined);
    });
  });

  describe('from()', () => {

    it('should create a value stream with a function adapter with given function', () => {
      const fn = () => true;
      const result = from(fn);
      const functionAdapter = result.getFactory() as FunctionAdapter<any>;

      expect(result).toBeInstanceOf(Stream);
      expect(functionAdapter).toBeInstanceOf(FunctionAdapter);
      expect(functionAdapter.getFunction()).toBe(fn);
    });
  });
});
