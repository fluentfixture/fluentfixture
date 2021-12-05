import { NON_EMPTY_ARRAY_DATA_SET } from '../data/type-sets';
import { Random } from '../../src/core/engine/random';
import { spy, verify, when } from 'ts-mockito';
import { Picker } from '../../src/core/collectios/picker';

describe('Picker', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (list)', () => {

      test.each(NON_EMPTY_ARRAY_DATA_SET)('should throw an error when list is not a non-empty-array, given: %s', (list: any) => {

        const thrown = () => new Picker(list);

        expect(thrown).toThrow('Parameter must be a non-empty array.');
      });
    });
  });

  describe('.single()', () => {

    it('should select a value from given list by using engine', () => {
      const spyEngine = spy(Random);
      const list = [1, 2, 3];
      const out = 1;
      const factory = new Picker(list);

      when(spyEngine.pick(list)).thenReturn(out);

      const result = factory.single();

      expect(result).toBe(out);
      verify(spyEngine.pick(list)).once();
    });
  });
});
