import { getNoopExpressionModifier } from '../../src/modifiers/noop-modifier';

describe('noop-modifier', () => {

  describe('getNoopExpressionModifier()', () => {

    it('should return a noop modifier that returns given parameter', () => {
      const value = 'value';
      const modifier = getNoopExpressionModifier();
      expect(modifier(value, null, null)).toBe(value);
    });
  });
});
