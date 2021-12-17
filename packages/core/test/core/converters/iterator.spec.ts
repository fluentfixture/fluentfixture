import { instance, mock, verify, when } from 'ts-mockito';
import { NON_INTEGER_DATA_SET } from '../../data/type-sets';
import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from '../../../src/constants/limits';
import { MockFactory } from '../../mocks/mock-factory';
import { Factory } from '../../../src/core/factory';
import { Iterator } from '../../../src/core/converters/iterator';

describe('Iterator', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (count)', () => {

      test.each(NON_INTEGER_DATA_SET)('should throw an error when count is not an integer, given: %s', (count: any) => {

        const thrown = () => new Iterator(new MockFactory({}), count);

        expect(thrown).toThrow('Parameter must be an integer.');
      });

      it('should throw an error when count is less than the minimum array length', () => {

        const thrown = () => new Iterator(new MockFactory({}), MIN_ARRAY_SIZE - 1);

        expect(thrown).toThrow(`Parameter must be between ${MIN_ARRAY_SIZE} and ${MAX_ARRAY_SIZE}.`);
      });

      it('should throw an error when count is greater than the maximum array length', () => {

        const thrown = () => new Iterator(new MockFactory({}), MAX_ARRAY_SIZE + 1);

        expect(thrown).toThrow(`Parameter must be between ${MIN_ARRAY_SIZE} and ${MAX_ARRAY_SIZE}.`);
      });
    });
  });

  describe('.single()', () => {

    it('should create an array by using given factory and count', () => {
      const count = 10;
      const out = ['out-1', 'out-2', 'out-3'];
      const mockFactory = mock(Factory);
      const factory = new Iterator(instance(mockFactory), count);

      when(mockFactory.many(count)).thenReturn(out);

      const result = factory.single();

      expect(result).toBe(out);
      verify(mockFactory.many(count)).once();
    });
  });
});
