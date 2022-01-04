import { getFallbackTransformer } from '../../src/transformers/fallback-transformer';

describe('fallback-transformer', () => {

  describe('getFallbackTransformer()', () => {

    it('should return a fallback transformer that returns given fallback if parameter is empty', () => {
      const value = null;
      const fallback = 'fallback';
      const modifier = getFallbackTransformer(fallback);
      expect(modifier(value)).toBe(fallback);
    });

    it('should return a fallback transformer that returns given parameter if parameter is not empty', () => {
      const value = 'value';
      const fallback = 'fallback';
      const modifier = getFallbackTransformer(fallback);
      expect(modifier(value)).toBe(value);
    });
  });
});
