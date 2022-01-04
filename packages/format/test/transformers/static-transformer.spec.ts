import { getStaticTransformer } from '../../src/transformers/static-transformer';

describe('static-transformer', () => {

  describe('getStaticTransformer()', () => {

    it('should return a static transformer which always returns given expression', () => {
      const expression = 'expression';
      const evaluator = getStaticTransformer(expression);
      expect(evaluator({ })).toBe(expression);
    });
  });
});
