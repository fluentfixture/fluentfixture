import { instance, mock, verify, when } from 'ts-mockito';
import { IFactory } from '../../../src/factories/interfaces/factory';
import { Memo } from '../../../src/factories/decorators/memo';

describe('Memo', () => {

  describe('.single()', () => {

    it('should use memoization with given factory', () => {
      const out = 'value';
      const mockFactory = mock<IFactory>();
      const factory = new Memo(instance(mockFactory));

      when(mockFactory.single()).thenReturn(out);

      const result1 = factory.single();
      const result2 = factory.single();
      const result3 = factory.single();

      expect(result1).toBe(out);
      expect(result2).toBe(out);
      expect(result3).toBe(out);
      verify(mockFactory.single()).once();
    });
  });
});
