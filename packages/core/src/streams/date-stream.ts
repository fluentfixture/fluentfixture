import * as dayjs from 'dayjs';
import { UnitType } from 'dayjs';
import { IFactory } from '../factories/interfaces/factory';
import { Functional } from '../factories/converters/functional';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { DateFactory } from '../factories/date-factory';
import { Stream, NumberStream } from './stream-loader';

export class DateStream extends Stream<Date> {
  public constructor(factory: IFactory<Date>) {
    super(factory);
  }

  public static between(min: Date, max: Date): DateStream {
    return new DateStream(new DateFactory(min, max));
  }

  public static fromDate(date: Date): DateStream {
    return new DateStream(new ValueAdapter(date));
  }

  public addMilliseconds(value: number): DateStream {
    return this.add(value, 'ms');
  }

  public subtractMilliseconds(value: number): DateStream {
    return this.subtract(value, 'ms');
  }

  public setMilliseconds(value: number): DateStream {
    return this.set(value, 'ms');
  }

  public getMilliseconds(): NumberStream {
    return this.get('ms');
  }

  public addSeconds(value: number): DateStream {
    return this.add(value, 's');
  }

  public subtractSeconds(value: number): DateStream {
    return this.subtract(value, 's');
  }

  public setSeconds(value: number): DateStream {
    return this.set(value, 's');
  }

  public getSeconds(): NumberStream {
    return this.get('s');
  }

  public addMinutes(value: number): DateStream {
    return this.add(value, 'm');
  }

  public subtractMinutes(value: number): DateStream {
    return this.subtract(value, 'm');
  }

  public setMinutes(value: number): DateStream {
    return this.set(value, 'm');
  }

  public getMinutes(): NumberStream {
    return this.get('m');
  }

  public addHours(value: number): DateStream {
    return this.add(value, 'h');
  }

  public subtractHours(value: number): DateStream {
    return this.subtract(value, 'h');
  }

  public setHours(value: number): DateStream {
    return this.set(value, 'h');
  }

  public getHours(): NumberStream {
    return this.get('h');
  }

  public addDays(value: number): DateStream {
    return this.add(value, 'd');
  }

  public subtractDays(value: number): DateStream {
    return this.subtract(value, 'd');
  }

  public setDaysOfWeek(value: number): DateStream {
    return this.set(value, 'day');
  }

  public setDaysOfMonth(value: number): DateStream {
    return this.set(value, 'date');
  }

  public getDaysOfWeek(): NumberStream {
    return this.get('day');
  }

  public getDaysOfMonth(): NumberStream {
    return this.get('date');
  }

  public addMonths(value: number): DateStream {
    return this.add(value, 'M');
  }

  public subtractMonths(value: number): DateStream {
    return this.subtract(value, 'M');
  }

  public setMonths(value: number): DateStream {
    return this.set(value, 'M');
  }

  public getMonths(): NumberStream {
    return this.get('M');
  }

  public addYears(value: number): DateStream {
    return this.add(value, 'y');
  }

  public subtractYears(value: number): DateStream {
    return this.subtract(value, 'y');
  }

  public setYears(value: number): DateStream {
    return this.set(value, 'y');
  }

  public getYears(): NumberStream {
    return this.get('y');
  }

  private add(value: number, unit: string): DateStream {
    return new DateStream(new Functional(this, (i) => dayjs(i).add(value, unit).toDate()));
  }

  private subtract(value: number, unit: string): DateStream {
    return new DateStream(new Functional(this, (i) => dayjs(i).subtract(value, unit).toDate()));
  }

  private set(value: number, unit: UnitType): DateStream {
    return new DateStream(new Functional(this, (i) => dayjs(i).set(unit, value).toDate()));
  }

  private get(unit: UnitType): NumberStream {
    return new NumberStream(new Functional(this, (i) => dayjs(i).get(unit)));
  }
}
