import { instance, mock, verify, when } from 'ts-mockito';
import { Stream } from '../../src/streams/stream'
import { NON_FACTORY_LIKE_DATA_SET } from '../data/type-sets';
import { AbstractFactory } from '../../src/core/abstract-factory';

describe('Stream', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (factory)', () => {

      test.each(NON_FACTORY_LIKE_DATA_SET)('should throw an error when factory is not a factory-like, given: %s', (factory: any) => {

        const thrown = () => new Stream(factory);

        expect(thrown).toThrow('Parameter must be a factory-like.');
      });
    });
  });

  describe('.single()', () => {

    it('should create a value by using given factory', () => {
      const mockFactory = mock(AbstractFactory);
      const out = 1;
      const factory = new Stream(instance(mockFactory));

      when(mockFactory.single()).thenReturn(out);

      const result = factory.single();

      expect(result).toBe(out);
      verify(mockFactory.single()).once();
    });
  });
});
