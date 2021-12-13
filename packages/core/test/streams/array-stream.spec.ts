import { MockFactory } from '../mocks/mock-factory';
import { ValueStream } from '../../src/streams/value-stream';
import { ArrayStream } from '../../src/streams/array-stream';
import { Picker } from '../../src/core/collectios/picker';
import { Sampler } from '../../src/core/collectios/sampler';

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
});
