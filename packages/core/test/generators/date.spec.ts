import { DateUtils } from '@fluentfixture/shared';
import { spy, verify, when } from 'ts-mockito';
import { date } from '../../src/generators/generators';
import { DateStream} from '../../src/streams/stream-loader';
import { DateFactory } from '../../src/factories/date-factory';

describe('date', () => {

  describe('date()', () => {

    it('should create a date stream with date factory with given min and max dates', () => {
      const min = new Date();
      const max = new Date();

      const result = date(min, max);

      const dateFactory = result.getFactory() as DateFactory;

      expect(result).toBeInstanceOf(DateStream);
      expect(dateFactory).toBeInstanceOf(DateFactory);
      expect(dateFactory.getMin()).toBe(min);
      expect(dateFactory.getMax()).toBe(max);
    });

    it('should use default max date when max is not provided', () => {
      const min = new Date();
      const max = new Date();
      const spyDateUtils = spy(DateUtils);

      when(spyDateUtils.getTomorrow()).thenReturn(max);

      const result = date(min);

      const dateFactory = result.getFactory() as DateFactory;

      expect(result).toBeInstanceOf(DateStream);
      expect(dateFactory).toBeInstanceOf(DateFactory);
      expect(dateFactory.getMin()).toBe(min);
      expect(dateFactory.getMax()).toBe(max);
      verify(spyDateUtils.getTomorrow()).once();
    });

    it('should use default min and max date when min and max are not provided', () => {
      const min = new Date();
      const max = new Date();
      const spyDateUtils = spy(DateUtils);

      when(spyDateUtils.getToday()).thenReturn(min);
      when(spyDateUtils.getTomorrow()).thenReturn(max);

      const result = date();

      const dateFactory = result.getFactory() as DateFactory;

      expect(result).toBeInstanceOf(DateStream);
      expect(dateFactory).toBeInstanceOf(DateFactory);
      expect(dateFactory.getMin()).toBe(min);
      expect(dateFactory.getMax()).toBe(max);
      verify(spyDateUtils.getToday()).once();
      verify(spyDateUtils.getTomorrow()).once();
    });
  });
});
