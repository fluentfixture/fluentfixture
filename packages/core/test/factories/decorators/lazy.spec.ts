import { instance, mock, verify, when } from 'ts-mockito';
import { NON_FUNCTION_DATA_SET, NON_PROPERTY_DATA_SET } from '../../data/type-sets';
import { MockFactory } from '../../mocks/mock-factory';
import { Factory } from '../../../src/factories/factory';
import { Lazy } from '../../../src/factories/decorators/lazy';

describe('Lazy', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (fn)', () => {

      test.each(NON_FUNCTION_DATA_SET)('should throw an error when converter is not a function, given: %s', (fn: any) => {

        const thrown = () => new Lazy(new MockFactory({}), fn, 'key');

        expect(thrown).toThrow('[Lazy.constructor(factory, fn, property)].[fn]: Parameter must be a function!');
      });
    });

    describe('parameter assertions (property)', () => {

      test.each(NON_PROPERTY_DATA_SET)('should throw an error when property is not a key, given: %s', (property: any) => {

        const thrown = () => new Lazy(new MockFactory({}), () => true, property);

        expect(thrown).toThrow('Parameter must be a key.');
      });
    });
  });

  describe('.single()', () => {

    it('should extend created object with given property and the result of the given function', () => {
      const source = { a: 1, b: 'str' };
      const property = 'c';
      const value = 'value';
      const mockFactory = mock(Factory);
      const converter = () => value;
      const decorator = new Lazy(instance(mockFactory), converter, property);

      when(mockFactory.single()).thenReturn(source);

      const result = decorator.single();

      expect(result).toStrictEqual({ a: 1, b: 'str', c: 'value' });
      verify(mockFactory.single()).once();
    });
  });
});
