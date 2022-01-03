import { getFallbackExpressionModifier } from '../../src/modifiers/fallback-modifier';

describe('fallback-modifier', () => {

  describe('getFallbackExpressionModifier()', () => {

    it('should return a fallback modifier that returns given fallback if parameter is empty', () => {
      const value = '';
      const fallback = 'fallback';
      const modifier = getFallbackExpressionModifier(fallback);
      expect(modifier(value, null, null)).toBe(fallback);
    });

    it('should return a fallback modifier that returns given parameter if parameter is not empty', () => {
      const value = 'value';
      const fallback = 'fallback';
      const modifier = getFallbackExpressionModifier(fallback);
      expect(modifier(value, null, null)).toBe(value);
    });
  });
});
