import { NON_EMPTY_ARRAY_DATA_SET, NON_INTEGER_DATA_SET } from '../../data/type-sets';
import { Random } from '../../../src/core/engine/random';
import { spy, verify, when } from 'ts-mockito';
import { Sampler } from '../../../src/core/collectios/sampler';

describe('Sampler', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (list)', () => {

      test.each(NON_EMPTY_ARRAY_DATA_SET)('should throw an error when list is not a non-empty-array, given: %s', (list: any) => {

        const thrown = () => new Sampler(list, 10);

        expect(thrown).toThrow('Parameter must be a non-empty array.');
      });
    });

    describe('parameter assertions (size)', () => {

      test.each(NON_INTEGER_DATA_SET)('should throw an error when size is not an integer, given: %s', (size: any) => {

        const thrown = () => new Sampler([1, 2, 3], size);

        expect(thrown).toThrow('Parameter must be an integer.');
      });

      it('should throw an error when size is less than the zero', () => {

        const list = [1, 2, 3];

        const thrown = () => new Sampler(list, -1);

        expect(thrown).toThrow(`Parameter must be between ${0} and ${list.length}.`);
      });

      it('should throw an error when size is greater than length of the list', () => {

        const list = [1, 2, 3];

        const thrown = () => new Sampler(list, 4);

        expect(thrown).toThrow(`Parameter must be between ${0} and ${list.length}.`);
      });
    });
  });

  describe('.single()', () => {

    it('should return sample from list with given size by using engine', () => {
      const spyEngine = spy(Random);
      const list = [1, 2, 3];
      const size = 2;
      const out = [1, 2];
      const factory = new Sampler(list, size);

      when(spyEngine.sample(list, size)).thenReturn(out);

      const result = factory.single();

      expect(result).toBe(out);
      verify(spyEngine.sample(list, size)).once();
    });
  });
});
