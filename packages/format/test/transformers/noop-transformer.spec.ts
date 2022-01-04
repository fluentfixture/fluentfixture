import { getNoopTransformer } from '../../src/transformers/noop-transformer';

describe('noop-transformer', () => {

  describe('getNoopTransformer()', () => {

    it('should return a noop transformer that returns given parameter', () => {
      const value = 'value';
      const modifier = getNoopTransformer();
      expect(modifier(value)).toBe(value);
    });
  });
});
