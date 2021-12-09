import { NON_FACTORY_LIKE_DATA_SET } from '../../data/type-sets';
import { Random } from '../../../src/core/engine/random';
import { instance, mock, spy, verify, when } from 'ts-mockito';
import { Picker } from '../../../src/core/collectios/picker';
import { AbstractFactory } from '../../../src/core/abstract-factory';

describe('Picker', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (factory)', () => {

      test.each(NON_FACTORY_LIKE_DATA_SET)('should throw an error when factory is not a factory-like, given: %s', (factory: any) => {

        const thrown = () => new Picker(factory);

        expect(thrown).toThrow('Parameter must be a factory-like.');
      });
    });
  });

  describe('.single()', () => {

    it('should select a value from the result of the given factory by using engine', () => {
      const spyEngine = spy(Random);
      const list = [1, 2, 3];
      const out = 1;
      const mockFactory = mock(AbstractFactory);
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
