import { instance, mock, verify, when } from 'ts-mockito';
import { IFactory } from '../../src/factories/interfaces/factory';
import { memo } from '../../src/utils/memo';

describe('memo', () => {

  describe('memo()', () => {

    it('should memoize of given factory', () => {
      const out = 'value';
      const mockFactory = mock<IFactory>();

      when(mockFactory.single()).thenReturn(out);

      const memoized = memo(instance(mockFactory));

      const result1 = memoized();
      const result2 = memoized();
      const result3 = memoized();

      expect(result1).toBe(out);
      expect(result2).toBe(out);
      expect(result3).toBe(out);
      verify(mockFactory.single()).once();
    });
  });
});
