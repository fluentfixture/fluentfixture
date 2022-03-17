import { Functional } from '../../src/generators/functional';
import { NON_FUNCTION_DATA_SET } from '../data/type-sets';
import { GeneratorFunction } from '../../src/types/generator-function';

describe('Functional', () => {

  describe('.constructor()', () => {

    test.each(NON_FUNCTION_DATA_SET)('should throw an error when generator function is not a function, given: %s', (fn: GeneratorFunction) => {

      const thrown = () => new Functional(fn);

      expect(thrown).toThrow('Generator must be a function!');
    });
  });

  describe('.process()', () => {

    it('should generates a value by using the given generator function', () => {
      const input = 1;
      const output = 2;
      const generatorFunction = (i: number) => i * 2;

      const generator = new Functional(generatorFunction);

      expect(generator.process(input)).toBe(output);
    });
  });
});
