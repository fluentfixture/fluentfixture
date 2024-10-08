import { Constant } from '../../../src/formatter/pipes/constant';

describe('Constant', () => {

  describe('.handle()', () => {

    it('should return always the given value', () => {
      const value = 'value';
      const pipe = new Constant(value);

      expect(pipe.handle()).toBe(value);
    });
  });
});
