import { MockFactory } from '../mocks/mock-factory';
import { ValueStream } from '../../src/streams/value-stream';
import { ArrayStream } from '../../src/streams/array-stream';
import { Picker } from '../../src/core/collectios/picker';

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
});
