import { spy, verify, when } from 'ts-mockito';
import { MockFactory } from '../mocks/mock-factory';
import { Stream, ArrayStream } from '../../src/streams/stream-loader';
import { ValueAdapter } from '../../src/factories/adapters/value-adapter';
import { assertArrayStreamDecorator } from '../assertions/array-stream-assertions';
import { Sampler } from '../../src/factories/converters/sampler';
import { Functional } from '../../src/factories/converters/functional';
import { ArrayHelper } from '../../src/helpers/array-helper';

describe('ArrayStream', () => {

  describe('.pick()', () => {

    it('should create a stream with functional decorator and the pick operation that wrap itself', () => {
      const array = [1, 2, 3];
      const out = 2;
      const stream = ArrayStream.fromList(array);
      const spyArrayHelper = spy(ArrayHelper);

      when(spyArrayHelper.pick(array)).thenReturn(out);

      const result = stream.pick();

      expect(result).toBeInstanceOf(Stream);

      const functional = result.getFactory() as Functional;
      expect(functional).toBeInstanceOf(Functional);
      expect(functional.getFactory()).toBe(stream);
      expect(result.single()).toBe(out);
      verify(spyArrayHelper.pick(array)).once();
    });
  });

  describe('.sample()', () => {

    it('should create a stream with sampler decorator that wraps itself', () => {
      const size = 5;
      const factory = new MockFactory([]);
      const stream = ArrayStream.iterate(factory, 10);

      const result = stream.sample(size);

      expect(result).toBeInstanceOf(ArrayStream);

      const sampler = result.getFactory() as Sampler;
      expect(sampler).toBeInstanceOf(Sampler);
      expect(sampler.getFactory()).toBe(stream);
      expect(sampler.getSize()).toBe(size);
    });
  });

  describe('.shuffle()', () => {

    it('should create a stream with functional decorator and the shuffle operation that wraps itself', () => {
      const arr = [1, 2, 3];
      const out = [1, 3, 2];
      const stream = ArrayStream.fromList(arr);
      const spyArrayHelper = spy(ArrayHelper);

      when(spyArrayHelper.shuffle(arr)).thenReturn(out);

      const result = stream.shuffle();

      expect(result).toBeInstanceOf(ArrayStream);

      const functional = result.getFactory() as Functional;
      expect(functional).toBeInstanceOf(Functional);
      expect(functional.getFactory()).toBe(stream);
      expect(result.single()).toBe(out);
      verify(spyArrayHelper.shuffle(arr)).once();
    });
  });

  describe('.map()', () => {

    it('should create a stream with factory decorator that wraps itself', () => {
      const value = [1, 2, 3];
      const stream = new ArrayStream(new ValueAdapter(value));

      assertArrayStreamDecorator(stream, stream.map((i) => i * 2), value, [2, 4, 6]);
    });
  });

  describe('.filter()', () => {

    it('should create a stream with factory decorator that wraps itself', () => {
      const value = [1, 2, 3];
      const stream = new ArrayStream(new ValueAdapter(value));

      assertArrayStreamDecorator(stream, stream.filter((i) => i % 2 === 1), value, [1, 3]);
    });
  });

  describe('.sort()', () => {

    it('should create a stream with factory decorator that wraps itself', () => {
      const value = [3, 2, 1, 4, 5];
      const stream = new ArrayStream(new ValueAdapter(value));

      assertArrayStreamDecorator(stream, stream.sort((a, b) => b - a), value, [5, 4, 3, 2, 1]);
    });

    it('should use default sort algorithm when sort function not given', () => {
      const value = [3, 2, 1, 4, 5];
      const stream = new ArrayStream(new ValueAdapter(value));

      assertArrayStreamDecorator(stream, stream.sort(), value, [1, 2, 3, 4, 5]);
    });
  });
});
