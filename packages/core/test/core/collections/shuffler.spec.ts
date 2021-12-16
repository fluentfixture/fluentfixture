import { NON_FACTORY_LIKE_DATA_SET } from '../../data/type-sets';
import { instance, mock, spy, verify, when } from 'ts-mockito';
import { Random } from '../../../src/core/engine/random';
import { AbstractFactory } from '../../../src/core/abstract-factory';
import { Shuffler } from '../../../src/core/collectios/shuffler';

describe('Shuffler', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (factory)', () => {

      test.each(NON_FACTORY_LIKE_DATA_SET)('should throw an error when factory is not a factory-like, given: %s', (factory: any) => {

        const thrown = () => new Shuffler(factory);

        expect(thrown).toThrow('Parameter must be a factory-like.');
      });
    });
  });

  describe('.single()', () => {

    it('should shuffle the result of the given factory by using engine', () => {
      const spyEngine = spy(Random);
      const list = [1, 2, 3];
      const out = [3, 2, 1];
      const mockFactory = mock(AbstractFactory);
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
