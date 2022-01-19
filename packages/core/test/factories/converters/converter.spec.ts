import { NON_FACTORY_LIKE_DATA_SET } from '../../data/type-sets';
import { Converter } from '../../../src/factories/converters/converter';
import { MockConverter } from '../../mocks/mock-converter';

describe('Converter', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (factory)', () => {

      test.each(NON_FACTORY_LIKE_DATA_SET)('should throw an error when factory is not a factory-like, given: %s', (factory: any) => {

        const thrown = () => new MockConverter(factory, 10);

        expect(thrown).toThrow('Parameter must be a factory-like.');
      });
    });
  });
});
