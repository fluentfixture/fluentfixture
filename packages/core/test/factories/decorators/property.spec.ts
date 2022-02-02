import { instance, mock, verify, when } from 'ts-mockito';
import { NON_FACTORY_LIKE_DATA_SET, NON_PROPERTY_DATA_SET } from '../../data/type-sets';
import { MockFactory } from '../../mocks/mock-factory';
import { Factory } from '../../../src/factories/factory';
import { Property } from '../../../src/factories/decorators/property';

describe('Property', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (decorator)', () => {

      test.each(NON_FACTORY_LIKE_DATA_SET)('should throw an error when decorator is not a factory-like, given: %s', (decorator: any) => {

        const thrown = () => new Property(new MockFactory({}), decorator, 'key');

        expect(thrown).toThrow('[Property.constructor(factory, decorator, property)].[decorator]: Parameter must be a factory-like!');
      });
    });

    describe('parameter assertions (property)', () => {

      test.each(NON_PROPERTY_DATA_SET)('should throw an error when property is not a key, given: %s', (property: any) => {

        const thrown = () => new Property(new MockFactory({}), new MockFactory({}), property);

        expect(thrown).toThrow('[Property.constructor(factory, decorator, property)].[property]: Parameter must be a string, number or symbol!');
      });
    });
  });

  describe('.single()', () => {

    it('should extend created object with given property and the result of the given factory', () => {
      const mockFactory = mock(Factory);
      const mockDecoratorFactory = mock(Factory);
      const source = { a: 1, b: 'str' };
      const property = 'c';
      const value = [];
      const factory = new Property(instance(mockFactory), instance(mockDecoratorFactory), property);

      when(mockFactory.single()).thenReturn(source);
      when(mockDecoratorFactory.single()).thenReturn(value);

      const result = factory.single();

      expect(result).toStrictEqual({ a: 1, b: 'str', c: [] });
      verify(mockFactory.single()).once();
      verify(mockDecoratorFactory.single()).once();
    });
  });
});
