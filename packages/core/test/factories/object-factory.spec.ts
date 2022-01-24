import { instance, mock, verify, when } from 'ts-mockito';
import { NON_FACTORY_LIKE_DATA_SET, NON_OBJECT_DATA_SET } from '../data/type-sets';
import { ObjectFactory } from '../../src/factories/object-factory';
import { Factory } from '../../src/factories/factory';

describe('ObjectFactory', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (model)', () => {

      test.each(NON_OBJECT_DATA_SET)('should throw an error when model is not an object, given: %s', (model: any) => {

        const thrown = () => new ObjectFactory(model);

        expect(thrown).toThrow('[ObjectFactory.constructor(model)].[model]: Parameter must be a key-value object that all keys are an instance of a factory-like!');
      });

      test.each(NON_FACTORY_LIKE_DATA_SET)('should throw an error when a key of model is not a factory-like, given: %s', (value: any) => {

        const thrown = () => new ObjectFactory({ key: value });

        expect(thrown).toThrow('[ObjectFactory.constructor(model)].[model]: Parameter must be a key-value object that all keys are an instance of a factory-like!');
      });
    });
  });

  describe('.single()', () => {

    it('should create a object by using given model', () => {
      const mockFactory1 = mock(Factory);
      const mockFactory2 = mock(Factory);
      const out1 = 1;
      const out2 = 2;
      const factory = new ObjectFactory({
        'key-1': instance(mockFactory1),
        'key-2': instance(mockFactory2)
      });

      when(mockFactory1.single()).thenReturn(out1);
      when(mockFactory2.single()).thenReturn(out2);

      const result = factory.single();

      expect(result).toStrictEqual({ 'key-1': 1, 'key-2': 2 });

      verify(mockFactory1.single()).once();
      verify(mockFactory2.single()).once();
    });
  });
});
