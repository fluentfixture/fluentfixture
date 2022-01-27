import { instance, mock, verify, when } from 'ts-mockito';
import { memo } from '../../src/utils/memo';
import { Factory } from '../../src/factories/factory';

describe('memo', () => {

  describe('memo()', () => {

    it('should memoize of given factory', () => {
      const out = 'value';
      const mockFactory = mock<Factory>();

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
