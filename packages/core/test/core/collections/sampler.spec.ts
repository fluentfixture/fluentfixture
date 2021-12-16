import { NON_FACTORY_LIKE_DATA_SET, NON_INTEGER_DATA_SET } from '../../data/type-sets';
import { Sampler } from '../../../src/core/collectios/sampler';
import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from '../../../src/constants/limits';
import { instance, mock, spy, verify, when } from 'ts-mockito';
import { Random } from '../../../src/core/engine/random';
import { AbstractFactory } from '../../../src/core/abstract-factory';
import { MockFactory } from '../../mocks/mock-factory';

describe('Sampler', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (factory)', () => {

      test.each(NON_FACTORY_LIKE_DATA_SET)('should throw an error when factory is not a factory-like, given: %s', (factory: any) => {

        const thrown = () => new Sampler(factory, 2);

        expect(thrown).toThrow('Parameter must be a factory-like.');
      });
    });

    describe('parameter assertions (size)', () => {

      test.each(NON_INTEGER_DATA_SET)('should throw an error when size is not an integer, given: %s', (size: any) => {

        const thrown = () => new Sampler(new MockFactory([]), size);

        expect(thrown).toThrow('Parameter must be an integer.');
      });

      it('should throw an error when size is less than the minimum array length', () => {

        const thrown = () => new Sampler(new MockFactory([]), MIN_ARRAY_SIZE - 1);

        expect(thrown).toThrow(`Parameter must be between ${MIN_ARRAY_SIZE} and ${MAX_ARRAY_SIZE}.`);
      });

      it('should throw an error when size is greater than the maximum array length', () => {

        const thrown = () => new Sampler(new MockFactory([]), MAX_ARRAY_SIZE + 1);

        expect(thrown).toThrow(`Parameter must be between ${MIN_ARRAY_SIZE} and ${MAX_ARRAY_SIZE}.`);
      });
    });
  });

  describe('.single()', () => {

    it('should select a sample from the result of the given factory with given size by using engine', () => {
      const spyEngine = spy(Random);
      const list = [1, 2, 3];
      const size = 2;
      const out = [1];
      const mockFactory = mock(AbstractFactory);
      const factory = new Sampler(instance(mockFactory), size);

      when(mockFactory.single()).thenReturn(list);
      when(spyEngine.sample(list, size)).thenReturn(out);

      const result = factory.single();

      expect(result).toBe(out);
      verify(spyEngine.sample(list, size)).once();
      verify(mockFactory.single()).once();
    });
  });
});
