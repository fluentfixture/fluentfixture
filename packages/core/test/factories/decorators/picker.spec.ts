import { spy, verify, when } from 'ts-mockito';
import { Random } from '@fluentfixture/shared';
import { Picker } from '../../../src/factories/decorators/picker';
import { MockFactory } from '../../mocks/mock-factory';

describe('Picker', () => {

  describe('.single()', () => {

    it('should picks a value from the array which generated by the given factory', () => {
      const spyEngine = spy(Random);
      const arr = [1, 2, 3];
      const out = 1;
      const factory = new Picker(new MockFactory(arr));

      when(spyEngine.pick(arr)).thenReturn(out);

      const result = factory.single();

      expect(result).toBe(out);
      verify(spyEngine.pick(arr)).once();
    });
  });
});
