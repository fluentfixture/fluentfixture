import { Identity } from '../../src/generators/identity';

describe('Identity', () => {

  describe('.process()', () => {

    it('should return the given value', () => {
      const value = 'value';
      const generator = new Identity();

      const result = generator.process(value);

      expect(result).toBe(value);
    });
  });
});
