import { NON_FUNCTION_DATA_SET } from '../../data/type-sets';
import { FunctionAdapter } from '../../../src/core/adapters/function-adapter';

describe('FunctionAdapter', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (producer)', () => {

      test.each(NON_FUNCTION_DATA_SET)('should throw an error when producer is not a function, given: %s', (producer: any) => {

        const thrown = () => new FunctionAdapter(producer);

        expect(thrown).toThrow('Parameter must be a function.');
      });
    });
  });

  describe('.single()', () => {

    it('should create a value by using given producer', () => {
      const out = true;
      const producer = () => out;
      const factory = new FunctionAdapter(producer);

      const result = factory.single();

      expect(result).toBe(out);
    });
  });
});
