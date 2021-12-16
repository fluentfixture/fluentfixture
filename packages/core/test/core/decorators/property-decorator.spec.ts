import { NON_FACTORY_LIKE_DATA_SET, NON_PROPERTY_DATA_SET } from '../../data/type-sets';
import { PropertyDecorator } from '../../../src/core/decorators/property-decorator';
import { MockFactory } from '../../mocks/mock-factory';
import { instance, mock, verify, when } from 'ts-mockito';
import { AbstractFactory } from '../../../src/core/abstract-factory';

describe('PropertyDecorator', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (source)', () => {

      test.each(NON_FACTORY_LIKE_DATA_SET)('should throw an error when source is not a factory-like, given: %s', (factory: any) => {

        const thrown = () => new PropertyDecorator(factory, new MockFactory({}), 'key');

        expect(thrown).toThrow('Parameter must be a factory-like.');
      });
    });

    describe('parameter assertions (factory)', () => {

      test.each(NON_FACTORY_LIKE_DATA_SET)('should throw an error when factory is not a factory-like, given: %s', (factory: any) => {

        const thrown = () => new PropertyDecorator(new MockFactory({}), factory, 'key');

        expect(thrown).toThrow('Parameter must be a factory-like.');
      });
    });

    describe('parameter assertions (property)', () => {

      test.each(NON_PROPERTY_DATA_SET)('should throw an error when property is not a key, given: %s', (property: any) => {

        const thrown = () => new PropertyDecorator(new MockFactory({}), new MockFactory({}), property);

        expect(thrown).toThrow('Parameter must be a key.');
      });
    });
  });

  describe('.single()', () => {

    it('should extend created object with given property and the result of the given factory', () => {
      const mockSourceFactory = mock(AbstractFactory);
      const mockFactory = mock(AbstractFactory);
      const source = { a: 1, b: 'str' };
      const property = 'c';
      const value = [];
      const decorator = new PropertyDecorator(instance(mockSourceFactory), instance(mockFactory), property);

      when(mockSourceFactory.single()).thenReturn(source);
      when(mockFactory.single()).thenReturn(value);

      const result = decorator.single();

      expect(result).toStrictEqual({ a: 1, b: 'str', c: [] });
      verify(mockSourceFactory.single()).once();
      verify(mockFactory.single()).once();
    });
  });
});
