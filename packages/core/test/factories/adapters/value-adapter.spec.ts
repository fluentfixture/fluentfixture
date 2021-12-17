import { ValueAdapter } from '../../../src/factories/adapters/value-adapter';

describe('ValueAdapter', () => {

  describe('.single()', () => {

    it('should return always given value', () => {
      const out = { };
      const factory = new ValueAdapter(out);

      const result = factory.single();

      expect(result).toBe(out);
    });
  });
});
