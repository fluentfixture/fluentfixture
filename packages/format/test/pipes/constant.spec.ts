import { Constant } from '../../src/pipes/constant';

describe('Constant', () => {

  describe('.handle()', () => {

    it('should return always the same given value', () => {
      const value = 'value';
      const pipe = new Constant(value);

      expect(pipe.handle()).toBe(value);
    });
  });
});
