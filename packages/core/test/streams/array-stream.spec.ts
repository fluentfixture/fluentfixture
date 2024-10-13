import { Stream, ArrayStream, StringStream } from '../../src/streams/stream-loader';
import { ValueAdapter } from '../../src/factories/adapters/value-adapter';
import { Picker } from '../../src/factories/decorators/picker';
import { Sampler } from '../../src/factories/decorators/sampler';
import { Shuffler } from '../../src/factories/decorators/shuffler';
import { Functional } from '../../src/factories/decorators/functional';
import { assertAndGetDecoratedArrayOperator } from './assertions/array-stream';

describe('ArrayStream', () => {

  describe('.pick()', () => {

    it('should create a stream with picker decorator that wrap itself', () => {
      const stream = ArrayStream.fromList([1, 2, 3]);

      const result = stream.pick();

      expect(result).toBeInstanceOf(Stream);

      const picker = result.getFactory() as Picker;
      expect(picker).toBeInstanceOf(Picker);
      expect(picker.getFactory()).toBe(stream);
    });
  });

  describe('.take()', () => {

    it('should create a stream with factory decorator that returns an item at the given index', () => {
      const array = [1, 2, 3];
      const stream = ArrayStream.fromList(array);

      const result = stream.take(1);

      expect(result).toBeInstanceOf(Stream);

      const functional = result.getFactory() as Functional;
      expect(functional).toBeInstanceOf(Functional);
      expect(functional.getFactory()).toBe(stream);

      const takeFn = functional.getFunction();

      expect(takeFn(array)).toBe(2);
    });

    it('should return undefined if the given index cannot be found', () => {
      const array = [1, 2, 3];
      const stream = ArrayStream.fromList(array);

      const result = stream.take(4);

      expect(result).toBeInstanceOf(Stream);

      const functional = result.getFactory() as Functional;
      expect(functional).toBeInstanceOf(Functional);
      expect(functional.getFactory()).toBe(stream);

      const takeFn = functional.getFunction();

      expect(takeFn(array)).toBeUndefined();
    });
  });

  describe('.first()', () => {

    it('should create a stream with factory decorator that returns the first item', () => {
      const array = [1, 2, 3];
      const stream = ArrayStream.fromList(array);

      const result = stream.first();

      expect(result).toBeInstanceOf(Stream);

      const functional = result.getFactory() as Functional;
      expect(functional).toBeInstanceOf(Functional);
      expect(functional.getFactory()).toBe(stream);

      const firstFn = functional.getFunction();

      expect(firstFn(array)).toBe(1);
    });

    it('should return undefined if the array has no items', () => {
      const array = [];
      const stream = ArrayStream.fromList(array);

      const result = stream.first();

      expect(result).toBeInstanceOf(Stream);

      const functional = result.getFactory() as Functional;
      expect(functional).toBeInstanceOf(Functional);
      expect(functional.getFactory()).toBe(stream);

      const firstFn = functional.getFunction();

      expect(firstFn(array)).toBeUndefined();
    });
  });

  describe('.last()', () => {

    it('should create a stream with factory decorator that returns the last item', () => {
      const array = [1, 2, 3];
      const stream = ArrayStream.fromList(array);

      const result = stream.last();

      expect(result).toBeInstanceOf(Stream);

      const functional = result.getFactory() as Functional;
      expect(functional).toBeInstanceOf(Functional);
      expect(functional.getFactory()).toBe(stream);

      const lastFn = functional.getFunction();

      expect(lastFn(array)).toBe(3);
    });

    it('should return undefined if the array has no items', () => {
      const array = [];
      const stream = ArrayStream.fromList(array);

      const result = stream.last();

      expect(result).toBeInstanceOf(Stream);

      const functional = result.getFactory() as Functional;
      expect(functional).toBeInstanceOf(Functional);
      expect(functional.getFactory()).toBe(stream);

      const lastFn = functional.getFunction();

      expect(lastFn(array)).toBeUndefined();
    });
  });

  describe('.join()', () => {

    it('should create a string stream with join decorator that wrap itself', () => {
      const array = [1, 2, 3];
      const separator = '+';
      const stream = ArrayStream.fromList(array);

      const result = stream.join(separator);

      expect(result).toBeInstanceOf(StringStream);

      const functional = result.getFactory() as Functional;
      expect(functional).toBeInstanceOf(Functional);
      expect(functional.getFactory()).toBe(stream);

      const joinFn = functional.getFunction();

      expect(joinFn(array)).toBe('1+2+3');
    });
  });

  describe('.sample()', () => {

    it('should create an array stream with sampler that wraps itself', () => {
      const size = 2;
      const stream = ArrayStream.fromList([1, 2, 3]);

      const result = stream.sample(size);

      expect(result).toBeInstanceOf(ArrayStream);

      const sampler = result.getFactory() as Sampler;
      expect(sampler).toBeInstanceOf(Sampler);
      expect(sampler.getFactory()).toBe(stream);
      expect(sampler.getSize()).toBe(size);
    });
  });

  describe('.shuffle()', () => {

    it('should create an array stream with shuffler decorator that wraps itself', () => {
      const arr = [1, 2, 3];
      const stream = ArrayStream.fromList(arr);

      const result = stream.shuffle();

      expect(result).toBeInstanceOf(ArrayStream);

      const picker = result.getFactory() as Shuffler;
      expect(picker).toBeInstanceOf(Shuffler);
      expect(picker.getFactory()).toBe(stream);
    });
  });

  describe('.map()', () => {

    it('should create a stream with factory decorator that wraps itself', () => {
      const value = [1, 2, 3];
      const stream = new ArrayStream(new ValueAdapter(value));

      const operator = assertAndGetDecoratedArrayOperator(stream, stream.map((i) => i * 2));

      expect(operator(value)).toStrictEqual([2, 4, 6]);
    });
  });

  describe('.filter()', () => {

    it('should create a stream with factory decorator that wraps itself', () => {
      const value = [1, 2, 3];
      const stream = new ArrayStream(new ValueAdapter(value));

      const operator = assertAndGetDecoratedArrayOperator(stream, stream.filter((i) => i % 2 === 1));

      expect(operator(value)).toStrictEqual([1, 3]);
    });
  });

  describe('.sort()', () => {

    it('should create a stream with factory decorator that wraps itself', () => {
      const value = [3, 2, 1, 4, 5];
      const stream = new ArrayStream(new ValueAdapter(value));

      const operator = assertAndGetDecoratedArrayOperator(stream, stream.sort((a, b) => b - a));

      expect(operator(value)).toStrictEqual([5, 4, 3, 2, 1]);
    });

    it('should use default sort algorithm when sort function not given', () => {
      const value = [3, 2, 1, 4, 5];
      const stream = new ArrayStream(new ValueAdapter(value));

      const operator = assertAndGetDecoratedArrayOperator(stream, stream.sort());

      expect(operator(value)).toStrictEqual([1, 2, 3, 4, 5]);
    });
  });
});
