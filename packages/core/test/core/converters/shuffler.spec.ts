import { instance, mock, spy, verify, when } from 'ts-mockito';
import { Random } from '../../../src/engine/random';
import { Factory } from '../../../src/core/factory';
import { Shuffler } from '../../../src/core/converters/shuffler';

describe('Shuffler', () => {

  describe('.single()', () => {

    it('should shuffle the result of the given factory by using engine', () => {
      const spyEngine = spy(Random);
      const list = [1, 2, 3];
      const out = [3, 2, 1];
      const mockFactory = mock(Factory);
      const factory = new Shuffler(instance(mockFactory));

      when(mockFactory.single()).thenReturn(list);
      when(spyEngine.shuffle(list)).thenReturn(out);

      const result = factory.single();

      expect(result).toBe(out);
      verify(spyEngine.shuffle(list)).once();
      verify(mockFactory.single()).once();
    });
  });
});
