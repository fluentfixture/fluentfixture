import { Fixed } from '../../src/generators/fixed';

describe('Fixed', () => {

  describe('.process()', () => {

    it('should return always the same given value', () => {
      const value = 'value';
      const generator = new Fixed(value);

      expect(generator.process()).toBe(value);
    });
  });
});
