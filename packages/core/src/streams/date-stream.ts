import { DateUtils } from '@fluentfixture/shared';
import { Functional } from '../factories/decorators/functional';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { DateFactory } from '../factories/date-factory';
import { Factory } from '../factories/factory';
import { Stream, NumberStream } from './stream-loader';

export class DateStream extends Stream<Date> {

  public constructor(factory: Factory<Date>) {
    super(factory);
  }

  public static between(min: Date, max: Date): DateStream {
    return new DateStream(new DateFactory(min, max));
  }

  public static fromDate(date: Date): DateStream {
    return new DateStream(new ValueAdapter(date));
  }

  public addMilliseconds(value: number): DateStream {
    return this.apply((i) => DateUtils.addMilliseconds(i, value));
  }

  public subtractMilliseconds(value: number): DateStream {
    return this.apply((i) => DateUtils.subtractMilliseconds(i, value));
  }

  public setMilliseconds(value: number): DateStream {
    return this.apply((i) => DateUtils.setMilliseconds(i, value));
  }

  public getMilliseconds(): NumberStream {
    return new NumberStream(new Functional(this, (i) => DateUtils.getMilliseconds(i)));
  }

  public addSeconds(value: number): DateStream {
    return this.apply((i) => DateUtils.addSeconds(i, value));
  }

  public subtractSeconds(value: number): DateStream {
    return this.apply((i) => DateUtils.subtractSeconds(i, value));
  }

  public setSeconds(value: number): DateStream {
    return this.apply((i) => DateUtils.setSeconds(i, value));
  }

  public getSeconds(): NumberStream {
    return new NumberStream(new Functional(this, (i) => DateUtils.getSeconds(i)));
  }

  public addMinutes(value: number): DateStream {
    return this.apply((i) => DateUtils.addMinutes(i, value));
  }

  public subtractMinutes(value: number): DateStream {
    return this.apply((i) => DateUtils.subtractMinutes(i, value));
  }

  public setMinutes(value: number): DateStream {
    return this.apply((i) => DateUtils.setMinutes(i, value));
  }

  public getMinutes(): NumberStream {
    return new NumberStream(new Functional(this, (i) => DateUtils.getMinutes(i)));
  }

  public addHours(value: number): DateStream {
    return this.apply((i) => DateUtils.addHours(i, value));
  }

  public subtractHours(value: number): DateStream {
    return this.apply((i) => DateUtils.subtractHours(i, value));
  }

  public setHours(value: number): DateStream {
    return this.apply((i) => DateUtils.setHours(i, value));
  }

  public getHours(): NumberStream {
    return new NumberStream(new Functional(this, (i) => DateUtils.getHours(i)));
  }

  public addDays(value: number): DateStream {
    return this.apply((i) => DateUtils.addDays(i, value));
  }

  public subtractDays(value: number): DateStream {
    return this.apply((i) => DateUtils.subtractDays(i, value));
  }

  public setDaysOfWeek(value: number): DateStream {
    return this.apply((i) => DateUtils.setDaysOfWeek(i, value));
  }

  public setDaysOfMonth(value: number): DateStream {
    return this.apply((i) => DateUtils.setDaysOfMonth(i, value));
  }

  public getDaysOfWeek(): NumberStream {
    return new NumberStream(new Functional(this, (i) => DateUtils.getDaysOfWeek(i)));
  }

  public getDaysOfMonth(): NumberStream {
    return new NumberStream(new Functional(this, (i) => DateUtils.getDaysOfMonth(i)));
  }

  public addMonths(value: number): DateStream {
    return this.apply((i) => DateUtils.addMonths(i, value));
  }

  public subtractMonths(value: number): DateStream {
    return this.apply((i) => DateUtils.subtractMonths(i, value));
  }

  public setMonths(value: number): DateStream {
    return this.apply((i) => DateUtils.setMonths(i, value));
  }

  public getMonths(): NumberStream {
    return new NumberStream(new Functional(this, (i) => DateUtils.getMonths(i)));
  }

  public addYears(value: number): DateStream {
    return this.apply((i) => DateUtils.addYears(i, value));
  }

  public subtractYears(value: number): DateStream {
    return this.apply((i) => DateUtils.subtractYears(i, value));
  }

  public setYears(value: number): DateStream {
    return this.apply((i) => DateUtils.setYears(i, value));
  }

  public getYears(): NumberStream {
    return new NumberStream(new Functional(this, (i) => DateUtils.getYears(i)));
  }
}
