import { Functional } from '../../../src/formatter/pipes/functional';

describe('Functional', () => {

  describe('.handle()', () => {

    it('should handle the input by using the given pipe function', () => {
      const input = 5;
      const coefficient = 10;
      const output = 50;
      const pipeFunction = (i: number, j: number) => i * j;

      const pipe = new Functional({ fn: pipeFunction, parameters: [coefficient] });

      expect(pipe.handle(input)).toBe(output);
    });
  });
});
