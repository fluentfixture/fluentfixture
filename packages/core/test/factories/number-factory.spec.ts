import { spy, verify, when } from 'ts-mockito';
import { NON_NUMBER_DATA_SET } from '../data/type-sets';
import { MAX_INTEGER, MIN_INTEGER } from '../../src/constants/limits';
import { Random } from '../../src/engine/random';
import { NumberFactory } from '../../src/factories/number-factory';

describe('NumberFactory', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (min)', () => {

      test.each(NON_NUMBER_DATA_SET)('should throw an error when min is not a number, given: %s', (min: any) => {

        const thrown = () => new NumberFactory(min, 1);

        expect(thrown).toThrow('Parameter must be a number.');
      });

      it('should throw an error when min is less than the minimum integer', () => {

        const thrown = () => new NumberFactory(MIN_INTEGER - 2, 1);

        expect(thrown).toThrow(`Parameter must be between ${MIN_INTEGER} and ${MAX_INTEGER}.`);
      });

      it('should throw an error when min is greater than the maximum integer', () => {

        const thrown = () => new NumberFactory(MAX_INTEGER + 2, 1);

        expect(thrown).toThrow(`Parameter must be between ${MIN_INTEGER} and ${MAX_INTEGER}.`);
      });
    });

    describe('parameter assertions (max)', () => {

      test.each(NON_NUMBER_DATA_SET)('should throw an error when max is not a number, given: %s', (max: any) => {

        const thrown = () => new NumberFactory(max, 1);

        expect(thrown).toThrow('Parameter must be a number.');
      });

      it('should throw an error when max is less than the minimum integer', () => {

        const thrown = () => new NumberFactory(1, MIN_INTEGER - 2);

        expect(thrown).toThrow(`Parameter must be between ${MIN_INTEGER} and ${MAX_INTEGER}.`);
      });

      it('should throw an error when max is greater than the maximum integer', () => {

        const thrown = () => new NumberFactory(1, MAX_INTEGER + 2);

        expect(thrown).toThrow(`Parameter must be between ${MIN_INTEGER} and ${MAX_INTEGER}.`);
      });
    });
  });

  describe('.single()', () => {

    it('should create a number by using engine', () => {
      const spyEngine = spy(Random);
      const min = 0;
      const max = 1;
      const out = 0.5;
      const factory = new NumberFactory(min, max);

      when(spyEngine.float(min, max)).thenReturn(out);

      const result = factory.single();

      expect(result).toBe(out);
      verify(spyEngine.float(min, max)).once();
    });
  });
});
