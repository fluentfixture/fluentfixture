import { Fallback } from '../../src/generators/fallback';

describe('Fallback', () => {

  describe('.process()', () => {

    it('should return the given value when parameter is not null or undefined', () => {
      const value = 'value';
      const fallback = 'fallback';
      const generator = new Fallback(fallback);

      expect(generator.process(value)).toBe(value);
    });

    const values = [
      [null],
      [undefined],
    ];
    test.each(values)('should return the given fallback when parameter is null or undefined: %p', (value: any) => {
      const fallback = 'fallback';
      const generator = new Fallback(fallback);

      expect(generator.process(value)).toBe(fallback);
    });
  });
});
