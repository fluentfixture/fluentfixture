import { Noop } from '../../src/pipes/noop';

describe('Noop', () => {

  describe('.handle()', () => {

    it('should return the given value without any modifications.', () => {
      const value = 'value';
      const pipe = Noop.instance();

      const result = pipe.handle(value);

      expect(result).toBe(value);
    });
  });
});
