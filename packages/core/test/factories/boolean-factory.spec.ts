import { spy, verify, when } from 'ts-mockito';
import { NON_NUMBER_DATA_SET } from '../data/type-sets';
import { MAX_PERCENTAGE, MIN_PERCENTAGE } from '../../src/constants/limits';
import { Random } from '../../src/engine/random';
import { BooleanFactory } from '../../src/factories/boolean-factory';

describe('BooleanFactory', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (percentage)', () => {

      test.each(NON_NUMBER_DATA_SET)('should throw an error when percentage is not a number, given: %s', (percentage: any) => {

        const thrown = () => new BooleanFactory(percentage);

        expect(thrown).toThrow('[BooleanFactory.constructor(percentage)].[percentage]: Parameter must be a number!');
      });

      it('should throw an error when percentage is less than the minimum percentage', () => {

        const thrown = () => new BooleanFactory(MIN_PERCENTAGE - 1);

        expect(thrown).toThrow(`[BooleanFactory.constructor(percentage)].[percentage]: Parameter must be between ${MIN_PERCENTAGE} and ${MAX_PERCENTAGE}!`);
      });

      it('should throw an error when percentage is greater than the maximum percentage', () => {

        const thrown = () => new BooleanFactory(MAX_PERCENTAGE + 1);

        expect(thrown).toThrow(`[BooleanFactory.constructor(percentage)].[percentage]: Parameter must be between ${MIN_PERCENTAGE} and ${MAX_PERCENTAGE}!`);
      });
    });
  });

  describe('.single()', () => {

    it('should create a boolean by using engine', () => {
      const spyEngine = spy(Random);
      const percentage = 0.5;
      const out = true;
      const factory = new BooleanFactory(percentage);

      when(spyEngine.bool(percentage)).thenReturn(out);

      const result = factory.single();

      expect(result).toBe(out);
      verify(spyEngine.bool(percentage)).once();
    });
  });
});
