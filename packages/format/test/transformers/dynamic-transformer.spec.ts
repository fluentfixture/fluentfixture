import * as path from 'object-path';
import { spy, verify, when } from 'ts-mockito';
import { getDynamicTransformer } from '../../src/transformers/dynamic-transformer';

describe('dynamic-transformer', () => {

  describe('getDynamicTransformer()', () => {

    it('should return a dynamic transformer which evaluates the expression by using object-path', () => {
      const source = { 'is-valid': true };
      const expression = 'is-valid';
      const result = true;
      const spyPath = spy(path);

      when(spyPath.get(source, expression)).thenReturn(result);

      const evaluator = getDynamicTransformer(expression);

      expect(evaluator(source)).toBe(result);
      verify(spyPath.get(source, expression)).once();
    });
  });
});
