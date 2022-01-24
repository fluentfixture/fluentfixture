import { MockFactory } from '../mocks/mock-factory';
import { NON_INTEGER_DATA_SET } from '../data/type-sets';
import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from '../../src/constants/limits';

describe('Factory', () => {

  const factory = new MockFactory({});

  describe('.many()', () => {

    describe('parameter assertions (count)', () => {

      test.each(NON_INTEGER_DATA_SET)('should throw an error when count is not an integer, given: %s', (count: any) => {

        const thrown = () => factory.many(count);

        expect(thrown).toThrow('[Factory.many(count)].[count]: Parameter must be an integer!');
      });

      it('should throw an error when count is less than the minimum array length', () => {

        const thrown = () => factory.many(MIN_ARRAY_SIZE - 1);

        expect(thrown).toThrow(`[Factory.many(count)].[count]: Parameter must be between ${MIN_ARRAY_SIZE} and ${MAX_ARRAY_SIZE}!`);
      });

      it('should throw an error when count is greater than the maximum array length', () => {

        const thrown = () => factory.many(MAX_ARRAY_SIZE + 1);

        expect(thrown).toThrow(`[Factory.many(count)].[count]: Parameter must be between ${MIN_ARRAY_SIZE} and ${MAX_ARRAY_SIZE}!`);
      });
    });

    describe('iterations', () => {

      it('should create a array of generated data with given count', () => {
        const out = {};
        const count = 3;
        const factory = new MockFactory(out);

        const result = factory.many(count);

        expect(result).toHaveLength(count);
        expect(result).toBeInstanceOf(Array);
        expect(result).toStrictEqual([out, out, out]);
      });
    });
  });
});
