import { MockFactory } from '../mocks/mock-factory';
import { ValueStream } from '../../src/streams/value-stream';
import { ArrayStream } from '../../src/streams/array-stream';
import { ValueAdapter } from '../../src/core/adapters/value-adapter';
import { assertArrayStreamDecorator } from '../assertions/array-stream-assertions';
import { Picker } from '../../src/core/converters/picker';
import { Sampler } from '../../src/core/converters/sampler';
import { Shuffler } from '../../src/core/converters/shuffler';

describe('ArrayStream', () => {

  describe('.pick()', () => {

    it('should create a stream with picker decorator that wraps itself', () => {
      const factory = new MockFactory([]);
      const stream = ArrayStream.of(factory, 10);

      const result = stream.pick();

      expect(result).toBeInstanceOf(ValueStream);

      const picker = result.getFactory() as Picker;
      expect(picker).toBeInstanceOf(Picker);
      expect(picker.getFactory()).toBe(stream);
    });
  });

  describe('.sample()', () => {

    it('should create a stream with sampler decorator that wraps itself', () => {
      const size = 5;
      const factory = new MockFactory([]);
      const stream = ArrayStream.of(factory, 10);

      const result = stream.sample(size);

      expect(result).toBeInstanceOf(ArrayStream);

      const sampler = result.getFactory() as Sampler;
      expect(sampler).toBeInstanceOf(Sampler);
      expect(sampler.getFactory()).toBe(stream);
      expect(sampler.getSize()).toBe(size);
    });
  });

  describe('.shuffle()', () => {

    it('should create a stream with shuffle decorator that wraps itself', () => {
      const factory = new MockFactory([]);
      const stream = ArrayStream.of(factory, 10);

      const result = stream.shuffle();

      expect(result).toBeInstanceOf(ArrayStream);

      const shuffler = result.getFactory() as Shuffler;
      expect(shuffler).toBeInstanceOf(Shuffler);
      expect(shuffler.getFactory()).toBe(stream);
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
