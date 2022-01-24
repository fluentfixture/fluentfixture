import { NON_FACTORY_LIKE_DATA_SET } from '../../data/type-sets';
import { Decorator } from '../../../src/factories/decorators/decorator';
import { MockDecorator } from '../../mocks/mock-decorator';

describe('Decorator', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (factory)', () => {

      test.each(NON_FACTORY_LIKE_DATA_SET)('should throw an error when factory is not a factory-like, given: %s', (factory: any) => {

        const thrown = () => new MockDecorator(factory, 10);

        expect(thrown).toThrow('[Decorator.constructor(factory)].[factory]: Parameter must be a factory-like!');
      });
    });
  });
});
