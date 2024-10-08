import { spy, verify, when } from 'ts-mockito';
import { Random } from '@fluentfixture/shared';
import { NON_DATE_DATA_SET } from '../data/type-sets';
import { DateFactory } from '../../src/factories/date-factory';

describe('DateFactory', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (min)', () => {

      test.each(NON_DATE_DATA_SET)('should throw an error when min is not a date, given: %s', (min: any) => {

        const thrown = () => new DateFactory(min, new Date());

        expect(thrown).toThrow('[DateFactory.constructor(min, max)].[min]: Parameter must be a date!');
      });
    });

    describe('parameter assertions (max)', () => {

      test.each(NON_DATE_DATA_SET)('should throw an error when max is not a date, given: %s', (max: any) => {

        const thrown = () => new DateFactory(new Date(), max)

        expect(thrown).toThrow('[DateFactory.constructor(min, max)].[max]: Parameter must be a date!');
      });
    });
  });

  describe('.single()', () => {

    it('should create a date by using engine', () => {
      const spyEngine = spy(Random);
      const min = new Date(-100);
      const max = new Date(100);
      const out = new Date(0);
      const factory = new DateFactory(min, max);

      when(spyEngine.date(min, max)).thenReturn(out);

      const result = factory.single();

      expect(result).toBe(out);
      verify(spyEngine.date(min, max)).once();
    });
  });
});
