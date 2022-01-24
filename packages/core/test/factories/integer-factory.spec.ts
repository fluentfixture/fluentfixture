import { spy, verify, when } from 'ts-mockito';
import { NON_INTEGER_DATA_SET } from '../data/type-sets';
import { MAX_INTEGER, MIN_INTEGER } from '../../src/constants/limits';
import { IntegerFactory } from '../../src/factories/integer-factory';
import { Random } from '../../src/engine/random';

describe('IntegerFactory', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (min)', () => {

      test.each(NON_INTEGER_DATA_SET)('should throw an error when min is not an integer, given: %s', (min: any) => {

        const thrown = () => new IntegerFactory(min, 1);

        expect(thrown).toThrow('[IntegerFactory.constructor(min, max)].[min]: Parameter must be an integer!');
      });

      it('should throw an error when min is less than the minimum integer', () => {

        const thrown = () => new IntegerFactory(MIN_INTEGER - 2, 1);

        expect(thrown).toThrow(`[IntegerFactory.constructor(min, max)].[min]: Parameter must be between ${MIN_INTEGER} and ${MAX_INTEGER}!`);
      });

      it('should throw an error when min is greater than the maximum integer', () => {

        const thrown = () => new IntegerFactory(MAX_INTEGER + 2, 1);

        expect(thrown).toThrow(`[IntegerFactory.constructor(min, max)].[min]: Parameter must be between ${MIN_INTEGER} and ${MAX_INTEGER}!`);
      });
    });

    describe('parameter assertions (max)', () => {

      test.each(NON_INTEGER_DATA_SET)('should throw an error when max is not an integer, given: %s', (max: any) => {

        const thrown = () => new IntegerFactory(1, max);

        expect(thrown).toThrow('[IntegerFactory.constructor(min, max)].[max]: Parameter must be an integer!');
      });

      it('should throw an error when max is less than the minimum integer', () => {

        const thrown = () => new IntegerFactory(1, MIN_INTEGER - 2);

        expect(thrown).toThrow(`[IntegerFactory.constructor(min, max)].[max]: Parameter must be between ${MIN_INTEGER} and ${MAX_INTEGER}!`);
      });

      it('should throw an error when max is greater than the maximum integer', () => {

        const thrown = () => new IntegerFactory(1, MAX_INTEGER + 2);

        expect(thrown).toThrow(`[IntegerFactory.constructor(min, max)].[max]: Parameter must be between ${MIN_INTEGER} and ${MAX_INTEGER}!`);
      });
    });
  });

  describe('.single()', () => {

    it('should create an integer by using engine', () => {
      const spyEngine = spy(Random);
      const min = 1;
      const max = 10;
      const out = 5;
      const factory = new IntegerFactory(min, max);

      when(spyEngine.integer(min, max)).thenReturn(out);

      const result = factory.single();

      expect(result).toBe(out);
      verify(spyEngine.integer(min, max)).once();
    });
  });
});
