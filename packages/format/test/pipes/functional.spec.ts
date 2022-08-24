import { Functional } from '../../src/pipes/functional';
import { NON_FUNCTION_DATA_SET } from '../data/type-sets';
import { PipeFunction } from '../../src/pipes/types/pipe-function';

describe('Functional', () => {

  describe('.constructor()', () => {

    test.each(NON_FUNCTION_DATA_SET)('should throw an error when pipe function is not a function, given: %s', (fn: PipeFunction) => {

      const thrown = () => new Functional({ fn, parameters: [] });

      expect(thrown).toThrow('Pipe must be a function!');
    });
  });

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
