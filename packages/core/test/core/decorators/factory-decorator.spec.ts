import { NON_FACTORY_LIKE_DATA_SET, NON_FUNCTION_DATA_SET } from '../../data/type-sets';
import { FactoryDecorator } from '../../../src/core/decorators/factory-decorator';
import { MockFactory } from '../../mocks/mock-factory';
import { instance, mock, verify, when } from 'ts-mockito';
import { AbstractFactory } from '../../../src/core/abstract-factory';

describe('FactoryDecorator', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (factory)', () => {

      test.each(NON_FACTORY_LIKE_DATA_SET)('should throw an error when factory is not a factory-like, given: %s', (factory: any) => {

        const thrown = () => new FactoryDecorator(factory, () => true);

        expect(thrown).toThrow('Parameter must be a factory-like.');
      });
    });

    describe('parameter assertions (decorator)', () => {

      test.each(NON_FUNCTION_DATA_SET)('should throw an error when decorator is not a function, given: %s', (decorator: any) => {

        const thrown = () => new FactoryDecorator(new MockFactory({}), decorator);

        expect(thrown).toThrow('Parameter must be a function.');
      });
    });
  });

  describe('.single()', () => {

    it('should map result of the given factory with given decorator function', () => {
      const mockFactory = mock(AbstractFactory);
      const factoryOut = 1;
      const out = 2;
      const decorator = () => out;
      const factory = new FactoryDecorator(instance(mockFactory), decorator);

      when(mockFactory.single()).thenReturn(factoryOut);

      const result = factory.single();

      expect(result).toBe(out);
      verify(mockFactory.single()).once();
    });
  });
});
