import { NON_FACTORY_LIKE_DATA_SET } from '../../data/type-sets';
import { Converter } from '../../../src/factories/converters/converter';
import { MockConverter } from '../../mocks/mock-converter';

describe('Converter', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (tokenEvaluatorFactory)', () => {

      test.each(NON_FACTORY_LIKE_DATA_SET)('should throw an error when tokenEvaluatorFactory is not a tokenEvaluatorFactory-like, given: %s', (factory: any) => {

        const thrown = () => new MockConverter(factory, 10);

        expect(thrown).toThrow('Parameter must be a tokenEvaluatorFactory-like.');
      });
    });
  });
});
