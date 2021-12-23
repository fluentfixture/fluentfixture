import * as dayjs from 'dayjs';
import { MockFactory } from '../mocks/mock-factory';
import { DateStream } from '../../src/streams/stream-loader';
import {
  assertDateStreamAddOrSubtract,
  assertDateStreamGet,
  assertDateStreamSet,
} from '../assertions/date-stream-assertions';

describe('DateStream', () => {
  const value = dayjs('2018-04-14T16:17:18.019+03:00').toDate();
  const operand = 1;
  const modifier = 5;
  const stream = new DateStream(new MockFactory(value));

  describe('millisecond operations', () => {

    describe('.addMilliseconds()', () => {

      it('should create a stream with function decorator (add milliseconds) that wraps itself', () => {
        assertDateStreamAddOrSubtract(stream, stream.addMilliseconds(operand), value, 'ms', 1);
      });
    });

    describe('.subtractMilliseconds()', () => {

      it('should create a stream with function decorator (subtract milliseconds) that wraps itself', () => {
        assertDateStreamAddOrSubtract(stream, stream.subtractMilliseconds(operand), value, 'ms', -1);
      });
    });

    describe('.setMilliseconds()', () => {

      it('should create a stream with function decorator (set milliseconds) that wraps itself', () => {
        assertDateStreamSet(stream, stream.setMilliseconds(modifier), value, 'ms', modifier);
      });
    });

    describe('.getMilliseconds()', () => {

      it('should create a stream with function decorator (get milliseconds) that wraps itself', () => {
        assertDateStreamGet(stream, stream.getMilliseconds(), value, 19);
      });
    });
  });

  describe('second operations', () => {

    describe('.addSeconds()', () => {

      it('should create a stream with function decorator (add seconds) that wraps itself', () => {
        assertDateStreamAddOrSubtract(stream, stream.addSeconds(operand), value, 's', 1);
      });
    });

    describe('.subtractSeconds()', () => {

      it('should create a stream with function decorator (subtract seconds) that wraps itself', () => {
        assertDateStreamAddOrSubtract(stream, stream.subtractSeconds(operand), value, 's', -1);
      });
    });

    describe('.setSeconds()', () => {

      it('should create a stream with function decorator (set seconds) that wraps itself', () => {
        assertDateStreamSet(stream, stream.setSeconds(modifier), value, 's', modifier);
      });
    });

    describe('.getSeconds()', () => {

      it('should create a stream with function decorator (get seconds) that wraps itself', () => {
        assertDateStreamGet(stream, stream.getSeconds(), value, 18);
      });
    });
  });

  describe('minute operations', () => {

    describe('.addMinutes()', () => {

      it('should create a stream with function decorator (add minutes) that wraps itself', () => {
        assertDateStreamAddOrSubtract(stream, stream.addMinutes(operand), value, 'm', 1);
      });
    });

    describe('.subtractMinutes()', () => {

      it('should create a stream with function decorator (subtract minutes) that wraps itself', () => {
        assertDateStreamAddOrSubtract(stream, stream.subtractMinutes(operand), value, 'm', -1);
      });
    });

    describe('.setMinutes()', () => {

      it('should create a stream with function decorator (set minutes) that wraps itself', () => {
        assertDateStreamSet(stream, stream.setMinutes(modifier), value, 'm', modifier);
      });
    });

    describe('.getMinutes()', () => {

      it('should create a stream with function decorator (get minutes) that wraps itself', () => {
        assertDateStreamGet(stream, stream.getMinutes(), value, 17);
      });
    });
  });

  describe('hour operations', () => {

    describe('.addHours()', () => {

      it('should create a stream with function decorator (add hours) that wraps itself', () => {
        assertDateStreamAddOrSubtract(stream, stream.addHours(operand), value, 'h', 1);
      });
    });

    describe('.subtractHours()', () => {

      it('should create a stream with function decorator (subtract hours) that wraps itself', () => {
        assertDateStreamAddOrSubtract(stream, stream.subtractHours(operand), value, 'h', -1);
      });
    });

    describe('.setHours()', () => {

      it('should create a stream with function decorator (set hours) that wraps itself', () => {
        assertDateStreamSet(stream, stream.setHours(modifier), value, 'h', modifier);
      });
    });

    describe('.getHours()', () => {

      it('should create a stream with function decorator (get hours) that wraps itself', () => {
        assertDateStreamGet(stream, stream.getHours(), value, 16);
      });
    });
  });

  describe('day operations', () => {

    describe('.addDays()', () => {

      it('should create a stream with function decorator (add days) that wraps itself', () => {
        assertDateStreamAddOrSubtract(stream, stream.addDays(operand), value, 'd', 1);
      });
    });

    describe('.subtractDays()', () => {

      it('should create a stream with function decorator (subtract days) that wraps itself', () => {
        assertDateStreamAddOrSubtract(stream, stream.subtractDays(operand), value, 'd', -1);
      });
    });

    describe('.setDaysOfWeek()', () => {

      it('should create a stream with function decorator (set days of week) that wraps itself', () => {
        assertDateStreamSet(stream, stream.setDaysOfWeek(modifier), value, 'day', modifier);
      });
    });

    describe('.setDaysOfMonth()', () => {

      it('should create a stream with function decorator (set days of month) that wraps itself', () => {
        assertDateStreamSet(stream, stream.setDaysOfMonth(modifier), value, 'date', modifier);
      });
    });

    describe('.getDaysOfWeek()', () => {

      it('should create a stream with function decorator (get days of week) that wraps itself', () => {
        assertDateStreamGet(stream, stream.getDaysOfWeek(), value,  6);
      });
    });

    describe('.getDaysOfMonth()', () => {

      it('should create a stream with function decorator (get days of month) that wraps itself', () => {
        assertDateStreamGet(stream, stream.getDaysOfMonth(), value,  14);
      });
    });
  });

  describe('month operations', () => {

    describe('.addMonths()', () => {

      it('should create a stream with function decorator (add months) that wraps itself', () => {
        assertDateStreamAddOrSubtract(stream, stream.addMonths(operand), value, 'M', 1);
      });
    });

    describe('.subtractMonths()', () => {

      it('should create a stream with function decorator (subtract months) that wraps itself', () => {
        assertDateStreamAddOrSubtract(stream, stream.subtractMonths(operand), value, 'M', -1);
      });
    });

    describe('.setMonths()', () => {

      it('should create a stream with function decorator (set months) that wraps itself', () => {
        assertDateStreamSet(stream, stream.setMonths(modifier), value, 'M', modifier);
      });
    });

    describe('.getMonths()', () => {

      it('should create a stream with function decorator (get months) that wraps itself', () => {
        assertDateStreamGet(stream, stream.getMonths(), value, 3);
      });
    });
  });

  describe('year operations', () => {

    describe('.addYears()', () => {

      it('should create a stream with function decorator (add years) that wraps itself', () => {
        assertDateStreamAddOrSubtract(stream, stream.addYears(operand), value, 'y', 1);
      });
    });

    describe('.subtractYears()', () => {

      it('should create a stream with function decorator (subtract years) that wraps itself', () => {
        assertDateStreamAddOrSubtract(stream, stream.subtractYears(operand), value, 'y', -1);
      });
    });

    describe('.setYears()', () => {

      it('should create a stream with function decorator (set years) that wraps itself', () => {
        assertDateStreamSet(stream, stream.setYears(modifier), value, 'y', modifier);
      });
    });

    describe('.getYears()', () => {

      it('should create a stream with function decorator (get years) that wraps itself', () => {
        assertDateStreamGet(stream, stream.getYears(), value, 2018);
      });
    });
  });
});
