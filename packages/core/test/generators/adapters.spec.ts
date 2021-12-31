import { val, nil, undef, from, pick, take, shuffle } from '../../src/generators/generators';
import { ValueAdapter } from '../../src/factories/adapters/value-adapter';
import { FunctionAdapter } from '../../src/factories/adapters/function-adapter';
import { ArrayStream, Stream } from '../../src/streams/stream-loader';
import { Picker } from '../../src/factories/converters/picker';
import { Sampler } from '../../src/factories/converters/sampler';
import { Shuffler } from '../../src/factories/converters/shuffler';
import { DEFAULT_SAMPLE_COUNT } from '../../src/constants/limits';

describe('adapters', () => {

  describe('val()', () => {

    it('should create a value stream with given value', () => {
      const value = {};
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

  describe('pick()', () => {

    it('should create an array stream with a picker with given array', () => {
      const arr = [1, 2, 3];
      const result = pick(arr);

      const picker = result.getFactory() as Picker;
      const arrayStream = picker.getFactory() as ArrayStream;
      const valueAdapter = arrayStream.getFactory() as ValueAdapter;

      expect(result).toBeInstanceOf(Stream);
      expect(picker).toBeInstanceOf(Picker);
      expect(arrayStream).toBeInstanceOf(ArrayStream);
      expect(valueAdapter).toBeInstanceOf(ValueAdapter);
      expect(valueAdapter.getValue()).toBe(arr);
    });
  });

  describe('take()', () => {

    it('should create an array stream with a sampler with given array', () => {
      const arr = [1, 2, 3];
      const size = 2;
      const result = take(arr, size);

      const sampler = result.getFactory() as Sampler;
      const arrayStream = sampler.getFactory() as ArrayStream;
      const valueAdapter = arrayStream.getFactory() as ValueAdapter;

      expect(result).toBeInstanceOf(ArrayStream);
      expect(sampler).toBeInstanceOf(Sampler);
      expect(sampler.getSize()).toBe(size);
      expect(arrayStream).toBeInstanceOf(ArrayStream);
      expect(valueAdapter).toBeInstanceOf(ValueAdapter);
      expect(valueAdapter.getValue()).toBe(arr);
    });

    it('should use default sample size when size is not provided', () => {
      const arr = [1, 2, 3];
      const result = take(arr);

      const sampler = result.getFactory() as Sampler;
      const arrayStream = sampler.getFactory() as ArrayStream;
      const valueAdapter = arrayStream.getFactory() as ValueAdapter;

      expect(result).toBeInstanceOf(ArrayStream);
      expect(sampler).toBeInstanceOf(Sampler);
      expect(sampler.getSize()).toBe(DEFAULT_SAMPLE_COUNT);
      expect(arrayStream).toBeInstanceOf(ArrayStream);
      expect(valueAdapter).toBeInstanceOf(ValueAdapter);
      expect(valueAdapter.getValue()).toBe(arr);
    });
  });

  describe('shuffle()', () => {

    it('should create an array stream with a suffler with given array', () => {
      const arr = [1, 2, 3];
      const result = shuffle(arr);

      const shuffler = result.getFactory() as Shuffler;
      const arrayStream = shuffler.getFactory() as ArrayStream;
      const valueAdapter = arrayStream.getFactory() as ValueAdapter;

      expect(result).toBeInstanceOf(ArrayStream);
      expect(shuffler).toBeInstanceOf(Shuffler);
      expect(arrayStream).toBeInstanceOf(ArrayStream);
      expect(valueAdapter).toBeInstanceOf(ValueAdapter);
      expect(valueAdapter.getValue()).toBe(arr);
    });
  });
});
