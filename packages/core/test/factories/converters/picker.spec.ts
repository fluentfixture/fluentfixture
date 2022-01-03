import { instance, mock, spy, verify, when } from 'ts-mockito';
import { Random } from '../../../src/engine/random';
import { Factory } from '../../../src/factories/factory';
import { Picker } from '../../../src/factories/converters/picker';
import { IFactory } from '../../../src/factories/interfaces/factory';

describe('Picker', () => {

  describe('.single()', () => {

    it('should select a value from the result of the given tokenEvaluatorFactory by using engine', () => {
      const spyEngine = spy(Random);
      const list = [1, 2, 3];
      const out = 1;
      const mockFactory = mock<IFactory<ReadonlyArray<any>>>(Factory);
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
