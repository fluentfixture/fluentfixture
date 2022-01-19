import { instance, mock, spy, verify, when } from 'ts-mockito';
import { Random } from '../../../src/engine/random';
import { Factory } from '../../../src/factories/factory';
import { Shuffler } from '../../../src/factories/converters/shuffler';
import { IFactory } from '../../../src/factories/interfaces/factory';

describe('Shuffler', () => {

  describe('.single()', () => {

    it('should shuffle the result of the given factory by using engine', () => {
      const spyEngine = spy(Random);
      const list = [1, 2, 3];
      const out = [3, 2, 1];
      const mockFactory = mock<IFactory<ReadonlyArray<any>>>(Factory);
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
