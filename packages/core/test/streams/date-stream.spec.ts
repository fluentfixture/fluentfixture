import { spy, verify, when } from 'ts-mockito';
import { DateUtils } from '@fluentfixture/shared';
import { DateStream } from '../../src/streams/stream-loader';
import {
  assertAndGetDecoratedDateOperator,
  assertAndGetDecoratedNumberOperator,
} from '../assertions/date-stream';
import { ValueAdapter } from '../../src/factories/adapters/value-adapter';

describe('DateStream', () => {

  describe('millisecond operations', () => {

    describe('.addMilliseconds()', () => {

      it('should create a stream with function decorator (add milliseconds) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.addMilliseconds(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.addMilliseconds(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.addMilliseconds(date, value)).once();
      });
    });

    describe('.subtractMilliseconds()', () => {

      it('should create a stream with function decorator (subtract milliseconds) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.subtractMilliseconds(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.subtractMilliseconds(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.subtractMilliseconds(date, value)).once();
      });
    });

    describe('.setMilliseconds()', () => {

      it('should create a stream with function decorator (set milliseconds) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.setMilliseconds(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.setMilliseconds(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.setMilliseconds(date, value)).once();
      });
    });

    describe('.getMilliseconds()', () => {

      it('should create a stream with function decorator (get milliseconds) that wraps itself', () => {
        const date = new Date();
        const output = 2;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.getMilliseconds(date)).thenReturn(output);

        const operator = assertAndGetDecoratedNumberOperator(stream, stream.getMilliseconds());

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.getMilliseconds(date)).once();
      });
    });
  });

  describe('second operations', () => {

    describe('.addSeconds()', () => {

      it('should create a stream with function decorator (add seconds) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.addSeconds(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.addSeconds(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.addSeconds(date, value)).once();
      });
    });

    describe('.subtractSeconds()', () => {

      it('should create a stream with function decorator (subtract seconds) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.subtractSeconds(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.subtractSeconds(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.subtractSeconds(date, value)).once();
      });
    });

    describe('.setSeconds()', () => {

      it('should create a stream with function decorator (set seconds) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.setSeconds(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.setSeconds(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.setSeconds(date, value)).once();
      });
    });

    describe('.getSeconds()', () => {

      it('should create a stream with function decorator (get seconds) that wraps itself', () => {
        const date = new Date();
        const output = 2;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.getSeconds(date)).thenReturn(output);

        const operator = assertAndGetDecoratedNumberOperator(stream, stream.getSeconds());

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.getSeconds(date)).once();
      });
    });
  });

  describe('minute operations', () => {

    describe('.addMinutes()', () => {

      it('should create a stream with function decorator (add minutes) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.addMinutes(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.addMinutes(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.addMinutes(date, value)).once();
      });
    });

    describe('.subtractMinutes()', () => {

      it('should create a stream with function decorator (subtract minutes) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.subtractMinutes(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.subtractMinutes(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.subtractMinutes(date, value)).once();
      });
    });

    describe('.setMinutes()', () => {

      it('should create a stream with function decorator (set minutes) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.setMinutes(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.setMinutes(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.setMinutes(date, value)).once();
      });
    });

    describe('.getMinutes()', () => {

      it('should create a stream with function decorator (get minutes) that wraps itself', () => {
        const date = new Date();
        const output = 2;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.getMinutes(date)).thenReturn(output);

        const operator = assertAndGetDecoratedNumberOperator(stream, stream.getMinutes());

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.getMinutes(date)).once();
      });
    });
  });

  describe('hour operations', () => {

    describe('.addHours()', () => {

      it('should create a stream with function decorator (add hours) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.addHours(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.addHours(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.addHours(date, value)).once();
      });
    });

    describe('.subtractHours()', () => {

      it('should create a stream with function decorator (subtract hours) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.subtractHours(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.subtractHours(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.subtractHours(date, value)).once();
      });
    });

    describe('.setHours()', () => {

      it('should create a stream with function decorator (set hours) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.setHours(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.setHours(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.setHours(date, value)).once();
      });
    });

    describe('.getHours()', () => {

      it('should create a stream with function decorator (get hours) that wraps itself', () => {
        const date = new Date();
        const output = 2;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.getHours(date)).thenReturn(output);

        const operator = assertAndGetDecoratedNumberOperator(stream, stream.getHours());

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.getHours(date)).once();
      });
    });
  });

  describe('day operations', () => {

    describe('.addDays()', () => {

      it('should create a stream with function decorator (add days) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.addDays(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.addDays(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.addDays(date, value)).once();
      });
    });

    describe('.subtractDays()', () => {

      it('should create a stream with function decorator (subtract days) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.subtractDays(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.subtractDays(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.subtractDays(date, value)).once();
      });
    });

    describe('.setDaysOfWeek()', () => {

      it('should create a stream with function decorator (set days of week) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.setDaysOfWeek(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.setDaysOfWeek(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.setDaysOfWeek(date, value)).once();
      });
    });

    describe('.setDaysOfMonth()', () => {

      it('should create a stream with function decorator (set days of month) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.setDaysOfMonth(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.setDaysOfMonth(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.setDaysOfMonth(date, value)).once();
      });
    });

    describe('.getDaysOfWeek()', () => {

      it('should create a stream with function decorator (get days of week) that wraps itself', () => {
        const date = new Date();
        const output = 2;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.getDaysOfWeek(date)).thenReturn(output);

        const operator = assertAndGetDecoratedNumberOperator(stream, stream.getDaysOfWeek());

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.getDaysOfWeek(date)).once();
      });
    });

    describe('.getDaysOfMonth()', () => {

      it('should create a stream with function decorator (get days of month) that wraps itself', () => {
        const date = new Date();
        const output = 2;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.getDaysOfMonth(date)).thenReturn(output);

        const operator = assertAndGetDecoratedNumberOperator(stream, stream.getDaysOfMonth());

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.getDaysOfMonth(date)).once();
      });
    });
  });

  describe('month operations', () => {

    describe('.addMonths()', () => {

      it('should create a stream with function decorator (add months) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.addMonths(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.addMonths(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.addMonths(date, value)).once();
      });
    });

    describe('.subtractMonths()', () => {

      it('should create a stream with function decorator (subtract months) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.subtractMonths(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.subtractMonths(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.subtractMonths(date, value)).once();
      });
    });

    describe('.setMonths()', () => {

      it('should create a stream with function decorator (set months) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.setMonths(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.setMonths(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.setMonths(date, value)).once();
      });
    });

    describe('.getMonths()', () => {

      it('should create a stream with function decorator (get months) that wraps itself', () => {
        const date = new Date();
        const output = 2;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.getMonths(date)).thenReturn(output);

        const operator = assertAndGetDecoratedNumberOperator(stream, stream.getMonths());

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.getMonths(date)).once();
      });
    });
  });

  describe('year operations', () => {

    describe('.addYears()', () => {

      it('should create a stream with function decorator (add years) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.addYears(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.addYears(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.addYears(date, value)).once();
      });
    });

    describe('.subtractYears()', () => {

      it('should create a stream with function decorator (subtract years) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.subtractYears(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.subtractYears(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.subtractYears(date, value)).once();
      });
    });

    describe('.setYears()', () => {

      it('should create a stream with function decorator (set years) that wraps itself', () => {
        const date = new Date();
        const output = new Date();
        const value = 1;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.setYears(date, value)).thenReturn(output);

        const operator = assertAndGetDecoratedDateOperator(stream, stream.setYears(value));

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.setYears(date, value)).once();
      });
    });

    describe('.getYears()', () => {

      it('should create a stream with function decorator (get years) that wraps itself', () => {
        const date = new Date();
        const output = 2;
        const stream = new DateStream(new ValueAdapter(date));
        const spyDateUtils = spy(DateUtils);

        when(spyDateUtils.getYears(date)).thenReturn(output);

        const operator = assertAndGetDecoratedNumberOperator(stream, stream.getYears());

        expect(operator(date)).toBe(output);

        verify(spyDateUtils.getYears(date)).once();
      });
    });
  });
});
