import * as path from 'object-path';
import { spy, verify, when } from 'ts-mockito';
import { getDynamicExpressionEvaluator } from '../../src/evaluators/dynamic-expression-evaluator';

describe('dynamic-expression-evaluator', () => {

  describe('getDynamicExpressionEvaluator()', () => {

    it('should return a identity expression evaluator which evaluates the expression by using object-path', () => {
      const source = { 'key': 'value'};
      const expression = 'key';
      const result = 'value';
      const spyPath = spy(path);

      when(spyPath.get(source, expression, '')).thenReturn(result);

      const evaluator = getDynamicExpressionEvaluator(expression);

      expect(evaluator(source)).toBe(result);
      verify(spyPath.get(source, expression, '')).once();
    });
  });
});
