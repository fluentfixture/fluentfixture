import { getStaticExpressionEvaluator } from '../../src/evaluators/static-expression-evaluator';

describe('static-expression-evaluator', () => {

  describe('getStaticExpressionEvaluator()', () => {

    it('should return a static expression evaluator which always returns given expression', () => {
      const expression = 'expression';
      const evaluator = getStaticExpressionEvaluator(expression);
      expect(evaluator({ })).toBe(expression);
    });
  });
});
