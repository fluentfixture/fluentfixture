import { Fallback } from '../../src/pipes/fallback';

describe('Fallback', () => {

  describe('.handle()', () => {

    it('should return the given value when parameter is not null or undefined', () => {
      const value = 'value';
      const fallback = 'fallback';
      const pipe = new Fallback(fallback);

      expect(pipe.handle(value)).toBe(value);
    });

    const values = [
      [null],
      [undefined],
    ];
    test.each(values)('should return the given fallback when parameter is null or undefined: %p', (value: any) => {
      const fallback = 'fallback';
      const pipe = new Fallback(fallback);

      expect(pipe.handle(value)).toBe(fallback);
    });
  });
});
