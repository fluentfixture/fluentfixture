import { instance, mock, spy, verify, when } from 'ts-mockito';
import { Random } from '@fluentfixture/shared';
import { NON_NUMBER_DATA_SET } from '../../data/type-sets';
import { MockFactory } from '../../mocks/mock-factory';
import { Selector } from '../../../src/factories/selectors/selector';
import { MAX_PERCENTAGE, MIN_PERCENTAGE } from '../../../src/constants/limits';
import { Factory } from '../../../src/factories/factory';

describe('Selector', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (percentage)', () => {

      const factory1 = new MockFactory({});
      const factory2 = new MockFactory({});

      test.each(NON_NUMBER_DATA_SET)('should throw an error when percentage is not a number, given: %s', (percentage: any) => {

        const thrown = () => new Selector(factory1, factory2, percentage);

        expect(thrown).toThrow('[Selector.constructor(factory1, factory2, percentage)].[percentage]: Parameter must be a number!');
      });

      it('should throw an error when percentage is less than the minimum percentage', () => {

        const thrown = () => new Selector(factory1, factory2, MIN_PERCENTAGE - 1);

        expect(thrown).toThrow(`[Selector.constructor(factory1, factory2, percentage)].[percentage]: Parameter must be between ${MIN_PERCENTAGE} and ${MAX_PERCENTAGE}!`);
      });

      it('should throw an error when percentage is greater than the maximum percentage', () => {

        const thrown = () => new Selector(factory1, factory2, MAX_PERCENTAGE + 1);

        expect(thrown).toThrow(`[Selector.constructor(factory1, factory2, percentage)].[percentage]: Parameter must be between ${MIN_PERCENTAGE} and ${MAX_PERCENTAGE}!`);
      });
    });

    describe('parameter assertions (factory-1)', () => {

      const percentage = 0.5;
      const factory = new MockFactory({});

      test.each(NON_NUMBER_DATA_SET)('should throw an error when factory-1 is not a factory-like, given: %s', (factory1: any) => {

        const thrown = () => new Selector(factory1, factory, percentage);

        expect(thrown).toThrow('[Selector.constructor(factory1, factory2, percentage)].[factory1]: Parameter must be a factory-like!');
      });
    });

    describe('parameter assertions (factory-2)', () => {

      const percentage = 0.5;
      const factory = new MockFactory({});

      test.each(NON_NUMBER_DATA_SET)('should throw an error when factory-2 is not a factory-like, given: %s', (factory2: any) => {

        const thrown = () => new Selector(factory, factory2, percentage);

        expect(thrown).toThrow('[Selector.constructor(factory1, factory2, percentage)].[factory2]: Parameter must be a factory-like!');
      });
    });
  });

  describe('.single()', () => {

    it('should select a first factory when engine returns true', () => {
      const spyEngine = spy(Random);
      const percentage = 0.5;
      const factory1 = mock(Factory);
      const factory2 = mock(Factory);
      const out = 1;
      const factory = new Selector(instance(factory1), instance(factory2), percentage);

      when(spyEngine.bool(percentage)).thenReturn(true);
      when(factory1.single()).thenReturn(out);

      const result = factory.single();

      expect(result).toBe(out);
      verify(spyEngine.bool(percentage)).once();
      verify(factory1.single()).once();
      verify(factory2.single()).never();
    });

    it('should select a second factory when engine returns false', () => {
      const spyEngine = spy(Random);
      const percentage = 0.5;
      const factory1 = mock(Factory);
      const factory2 = mock(Factory);
      const out = 2;
      const factory = new Selector(instance(factory1), instance(factory2), percentage);

      when(spyEngine.bool(percentage)).thenReturn(false);
      when(factory2.single()).thenReturn(out);

      const result = factory.single();

      expect(result).toBe(out);
      verify(spyEngine.bool(percentage)).once();
      verify(factory1.single()).never();
      verify(factory2.single()).once();
    });
  });
});
