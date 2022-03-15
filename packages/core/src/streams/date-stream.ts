import { Functional } from '../factories/decorators/functional';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { DateFactory } from '../factories/date-factory';
import { DateHelper } from '../helpers/date-helper';
import { Factory } from '../factories/factory';
import { Stream, NumberStream } from './stream-loader';

/**
 * `DateStream` extends the `Stream.<Date>` class for date operations.
 * @see Stream
 * @class
 * @extends Stream.<Date>
 */
export class DateStream extends Stream<Date> {

  /**
   * Creates an instance of `DateStream`.
   * @constructor
   * @param {Factory.<Date>} [factory] - the factory to be decorated
   */
  public constructor(factory: Factory<Date>) {
    super(factory);
  }

  /**
   * Creates a `DateStream` with `DateFactory` and the given boundary.
   * @see DateFactory
   * @static
   * @public
   * @param {Date} [min=now] - the minimum of the boundary
   * @param {Date} [max=tomorrow] - the maximum of the boundary
   * @returns {DateStream}
   */
  public static between(min: Date, max: Date): DateStream {
    return new DateStream(new DateFactory(min, max));
  }

  /**
   * Creates a `DateStream` with `ValueAdapter` adapter and the given date, which means it always generates the given date.
   * @see ValueAdapter
   * @static
   * @public
   * @param {Date} [date] - the date to be generated
   * @returns {DateStream}
   */
  public static fromDate(date: Date): DateStream {
    return new DateStream(new ValueAdapter(date));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `add-milliseconds` operator`.
   * @see Functional
   * @public
   * @param {number} [value] - the count of the milliseconds to be added
   * @returns {DateStream}
   */
  public addMilliseconds(value: number): DateStream {
    return this.apply((i) => DateHelper.addMilliseconds(i, value));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `subtract-milliseconds` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the count of the milliseconds to be subtracted
   * @returns {DateStream}
   */
  public subtractMilliseconds(value: number): DateStream {
    return this.apply((i) => DateHelper.subtractMilliseconds(i, value));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `set-milliseconds` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the value of the milliseconds to be set
   * @returns {DateStream}
   */
  public setMilliseconds(value: number): DateStream {
    return this.apply((i) => DateHelper.setMilliseconds(i, value));
  }

  /**
   * Creates a `NumberStream` with `Functional` decorator and the `get-milliseconds` operator.
   * @see NumberStream
   * @see Functional
   * @public
   * @returns {NumberStream}
   */
  public getMilliseconds(): NumberStream {
    return new NumberStream(new Functional(this, (i) => DateHelper.getMilliseconds(i)));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `add-seconds` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the count of the seconds to be added
   * @returns {DateStream}
   */
  public addSeconds(value: number): DateStream {
    return this.apply((i) => DateHelper.addSeconds(i, value));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `subtract-seconds` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the count of the seconds to be subtracted
   * @returns {DateStream}
   */
  public subtractSeconds(value: number): DateStream {
    return this.apply((i) => DateHelper.subtractSeconds(i, value));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `set-seconds` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the value of the seconds to be set
   * @returns {DateStream}
   */
  public setSeconds(value: number): DateStream {
    return this.apply((i) => DateHelper.setSeconds(i, value));
  }

  /**
   * Creates a `NumberStream` with `Functional` decorator and the `get-seconds` operator.
   * @see NumberStream
   * @see Functional
   * @public
   * @returns {NumberStream}
   */
  public getSeconds(): NumberStream {
    return new NumberStream(new Functional(this, (i) => DateHelper.getSeconds(i)));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `add-minutes` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the count of the minutes to be added
   * @returns {DateStream}
   */
  public addMinutes(value: number): DateStream {
    return this.apply((i) => DateHelper.addMinutes(i, value));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `subtract-minutes` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the count of the minutes to be subtracted
   * @returns {DateStream}
   */
  public subtractMinutes(value: number): DateStream {
    return this.apply((i) => DateHelper.subtractMinutes(i, value));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `set-minutes` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the value of the minutes to be set
   * @returns {DateStream}
   */
  public setMinutes(value: number): DateStream {
    return this.apply((i) => DateHelper.setMinutes(i, value));
  }

  /**
   * Creates a `NumberStream` with `Functional` decorator and the `get-minutes` operator.
   * @see NumberStream
   * @see Functional
   * @public
   * @returns {NumberStream}
   */
  public getMinutes(): NumberStream {
    return new NumberStream(new Functional(this, (i) => DateHelper.getMinutes(i)));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `add-hours` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the count of the hours to be added
   * @returns {DateStream}
   */
  public addHours(value: number): DateStream {
    return this.apply((i) => DateHelper.addHours(i, value));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `subtract-hours` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the count of the hours to be subtracted
   * @returns {DateStream}
   */
  public subtractHours(value: number): DateStream {
    return this.apply((i) => DateHelper.subtractHours(i, value));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `set-hours` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the value of the hours to be set
   * @returns {DateStream}
   */
  public setHours(value: number): DateStream {
    return this.apply((i) => DateHelper.setHours(i, value));
  }

  /**
   * Creates a `NumberStream` with `Functional` decorator and the `get-hours` operator.
   * @see NumberStream
   * @see Functional
   * @public
   * @returns {NumberStream}
   */
  public getHours(): NumberStream {
    return new NumberStream(new Functional(this, (i) => DateHelper.getHours(i)));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `add-days` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the count of the days to be added
   * @returns {DateStream}
   */
  public addDays(value: number): DateStream {
    return this.apply((i) => DateHelper.addDays(i, value));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `subtract-days` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the count of the days to be subtracted
   * @returns {DateStream}
   */
  public subtractDays(value: number): DateStream {
    return this.apply((i) => DateHelper.subtractDays(i, value));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `set-days-of-week` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the value of the days of week to be set
   * @returns {DateStream}
   */
  public setDaysOfWeek(value: number): DateStream {
    return this.apply((i) => DateHelper.setDaysOfWeek(i, value));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `set-days-of-month` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the value of the days of month to be set
   * @returns {DateStream}
   */
  public setDaysOfMonth(value: number): DateStream {
    return this.apply((i) => DateHelper.setDaysOfMonth(i, value));
  }

  /**
   * Creates a `NumberStream` with `Functional` decorator and the `get-days-of-week` operator.
   * @see NumberStream
   * @see Functional
   * @public
   * @returns {NumberStream}
   */
  public getDaysOfWeek(): NumberStream {
    return new NumberStream(new Functional(this, (i) => DateHelper.getDaysOfWeek(i)));
  }

  /**
   * Creates a `NumberStream` with `Functional` decorator and the `get-days-of-month` operator.
   * @see NumberStream
   * @see Functional
   * @public
   * @returns {NumberStream}
   */
  public getDaysOfMonth(): NumberStream {
    return new NumberStream(new Functional(this, (i) => DateHelper.getDaysOfMonth(i)));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `add-months` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the count of the months to be added
   * @returns {DateStream}
   */
  public addMonths(value: number): DateStream {
    return this.apply((i) => DateHelper.addMonths(i, value));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `subtract-months` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the count of the months to be subtracted
   * @returns {DateStream}
   */
  public subtractMonths(value: number): DateStream {
    return this.apply((i) => DateHelper.subtractMonths(i, value));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `set-months` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the value of the months to be set
   * @returns {DateStream}
   */
  public setMonths(value: number): DateStream {
    return this.apply((i) => DateHelper.setMonths(i, value));
  }

  /**
   * Creates a `NumberStream` with `Functional` decorator and the `get-months` operator.
   * @see NumberStream
   * @see Functional
   * @public
   * @returns {NumberStream}
   */
  public getMonths(): NumberStream {
    return new NumberStream(new Functional(this, (i) => DateHelper.getMonths(i)));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `add-years` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the count of the years to be added
   * @returns {DateStream}
   */
  public addYears(value: number): DateStream {
    return this.apply((i) => DateHelper.addYears(i, value));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `subtract-years` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the count of the years to be subtracted
   * @returns {DateStream}
   */
  public subtractYears(value: number): DateStream {
    return this.apply((i) => DateHelper.subtractYears(i, value));
  }

  /**
   * Creates a `DateStream` with `Functional` decorator and the `set-years` operator.
   * @see Functional
   * @public
   * @param {number} [value] - the value of the years to be set
   * @returns {DateStream}
   */
  public setYears(value: number): DateStream {
    return this.apply((i) => DateHelper.setYears(i, value));
  }

  /**
   * Creates a `NumberStream` with `Functional` decorator and the `get-years` operator.
   * @see NumberStream
   * @see Functional
   * @public
   * @returns {NumberStream}
   */
  public getYears(): NumberStream {
    return new NumberStream(new Functional(this, (i) => DateHelper.getYears(i)));
  }
}
