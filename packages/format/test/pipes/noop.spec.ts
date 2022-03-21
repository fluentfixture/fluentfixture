import { Noop } from '../../src/pipes/noop';

describe('Noop', () => {

  describe('.handle()', () => {

    it('should return the given value without any modifications.', () => {
      const value = 'value';
      const pipe = new Noop();

      const result = pipe.handle(value);

      expect(result).toBe(value);
    });
  });
});
