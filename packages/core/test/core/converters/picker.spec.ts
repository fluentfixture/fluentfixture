import { instance, mock, spy, verify, when } from 'ts-mockito';
import { Random } from '../../../src/engine/random';
import { Factory } from '../../../src/core/factory';
import { Picker } from '../../../src/core/converters/picker';

describe('Picker', () => {

  describe('.single()', () => {

    it('should select a value from the result of the given factory by using engine', () => {
      const spyEngine = spy(Random);
      const list = [1, 2, 3];
      const out = 1;
      const mockFactory = mock(Factory);
      const factory = new Picker(instance(mockFactory));

      when(mockFactory.single()).thenReturn(list);
      when(spyEngine.pick(list)).thenReturn(out);

      const result = factory.single();

      expect(result).toBe(out);
      verify(spyEngine.pick(list)).once();
      verify(mockFactory.single()).once();
    });
  });
});
