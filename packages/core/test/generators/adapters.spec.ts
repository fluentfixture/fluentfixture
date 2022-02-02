import { spy, verify, when } from 'ts-mockito';
import { val, nil, undef, from, pick, take, shuffle } from '../../src/generators/generators';
import { ValueAdapter } from '../../src/factories/adapters/value-adapter';
import { FunctionAdapter } from '../../src/factories/adapters/function-adapter';
import { ArrayStream, Stream } from '../../src/streams/stream-loader';
import { DEFAULT_SAMPLE_COUNT } from '../../src/constants/limits';
import { Functional } from '../../src/factories/decorators/functional';
import { ArrayHelper } from '../../src/helpers/array-helper';
import { Picker } from '../../src/factories/decorators/picker';

describe('adapters', () => {

  describe('val()', () => {

    it('should create a stream with value adapter', () => {
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

    it('should create a stream with a function adapter with given function', () => {
      const fn = () => true;

      const result = from(fn);

      const functionAdapter = result.getFactory() as FunctionAdapter<any>;

      expect(result).toBeInstanceOf(Stream);
      expect(functionAdapter).toBeInstanceOf(FunctionAdapter);
      expect(functionAdapter.getFunction()).toBe(fn);
    });
  });

  describe('pick()', () => {

    it('should create an stream with picker decorator', () => {
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

    it('should create an array stream with a functional and the sample operation', () => {
      const arr = [1, 2, 3];
      const size = 2;
      const out = [1, 2];
      const spyArrayHelper = spy(ArrayHelper);

      when(spyArrayHelper.sample(arr, size)).thenReturn(out);

      const result = take(arr, size);

      const functional = result.getFactory() as Functional;
      const arrayStream = functional.getFactory() as ArrayStream;
      const valueAdapter = arrayStream.getFactory() as ValueAdapter;

      expect(result).toBeInstanceOf(ArrayStream);
      expect(functional).toBeInstanceOf(Functional);
      expect(arrayStream).toBeInstanceOf(ArrayStream);
      expect(valueAdapter).toBeInstanceOf(ValueAdapter);
      expect(valueAdapter.getValue()).toBe(arr);
      expect(result.single()).toBe(out);
      verify(spyArrayHelper.sample(arr, size)).once();
    });

    it('should use default sample size when size is not provided', () => {
      const arr = [1, 2, 3];
      const out = [1, 2];
      const spyArrayHelper = spy(ArrayHelper);

      when(spyArrayHelper.sample(arr, DEFAULT_SAMPLE_COUNT)).thenReturn(out);

      const result = take(arr);

      const functional = result.getFactory() as Functional;
      const arrayStream = functional.getFactory() as ArrayStream;
      const valueAdapter = arrayStream.getFactory() as ValueAdapter;

      expect(result).toBeInstanceOf(ArrayStream);
      expect(functional).toBeInstanceOf(Functional);
      expect(arrayStream).toBeInstanceOf(ArrayStream);
      expect(valueAdapter).toBeInstanceOf(ValueAdapter);
      expect(valueAdapter.getValue()).toBe(arr);
      expect(result.single()).toBe(out);
      verify(spyArrayHelper.sample(arr, DEFAULT_SAMPLE_COUNT)).once();
    });
  });

  describe('shuffle()', () => {

    it('should create an array stream with functional and the shuffle operation', () => {
      const arr = [1, 2, 3];
      const out = [4, 3, 2];
      const spyArrayHelper = spy(ArrayHelper);

      when(spyArrayHelper.shuffle(arr)).thenReturn(out);

      const result = shuffle(arr);

      const functional = result.getFactory() as Functional;
      const arrayStream = functional.getFactory() as ArrayStream;
      const valueAdapter = arrayStream.getFactory() as ValueAdapter;

      expect(result).toBeInstanceOf(ArrayStream);
      expect(functional).toBeInstanceOf(Functional);
      expect(arrayStream).toBeInstanceOf(ArrayStream);
      expect(valueAdapter).toBeInstanceOf(ValueAdapter);
      expect(valueAdapter.getValue()).toBe(arr);
      expect(result.single()).toBe(out);
      verify(spyArrayHelper.shuffle(arr)).once();
    });
  });
});
