import { getIdentityExpressionEvaluator } from '../../src/evaluators/identity-expression-evaluator';

describe('identity-expression-evaluator', () => {

  describe('getIdentityExpressionEvaluator()', () => {

    it('should return a identity expression evaluator which always returns string of given source', () => {
      const source = 1;
      const evaluator = getIdentityExpressionEvaluator();
      expect(evaluator(source)).toBe('1');
    });
  });
});
