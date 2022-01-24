import * as dayjs from 'dayjs';
import { UnitType } from 'dayjs';

/**
 * @todo Support week operations
 * @body DateUtils not support week operations for now.
 */

export class DateHelper {

  public static now(): Date {
    return dayjs().toDate();
  }

  public static getToday(): Date {
    return dayjs().toDate();
  }

  public static getYesterday(): Date {
    return dayjs().subtract(1, 'day').toDate();
  }

  public static getTomorrow(): Date {
    return dayjs().add(1, 'day').toDate();
  }

  public static addMilliseconds(date: Date, value: number): Date {
    return DateHelper.addTimeUnit(date, 'ms', value);
  }

  public static subtractMilliseconds(date: Date, value: number): Date {
    return DateHelper.subtractTimeUnit(date, 'ms', value);
  }

  public static setMilliseconds(date: Date, value: number): Date {
    return DateHelper.setTimeUnit(date, 'ms', value);
  }

  public static getMilliseconds(date: Date): number {
    return DateHelper.getTimeUnit(date, 'ms');
  }

  public static addSeconds(date: Date, value: number): Date {
    return DateHelper.addTimeUnit(date, 's', value);
  }

  public static subtractSeconds(date: Date, value: number): Date {
    return DateHelper.subtractTimeUnit(date, 's', value);
  }

  public static setSeconds(date: Date, value: number): Date {
    return DateHelper.setTimeUnit(date, 's', value);
  }

  public static getSeconds(date: Date): number {
    return DateHelper.getTimeUnit(date, 's');
  }

  public static addMinutes(date: Date, value: number): Date {
    return DateHelper.addTimeUnit(date, 'm', value);
  }

  public static subtractMinutes(date: Date, value: number): Date {
    return DateHelper.subtractTimeUnit(date, 'm', value);
  }

  public static setMinutes(date: Date, value: number): Date {
    return DateHelper.setTimeUnit(date, 'm', value);
  }

  public static getMinutes(date: Date): number {
    return DateHelper.getTimeUnit(date, 'm');
  }

  public static addHours(date: Date, value: number): Date {
    return DateHelper.addTimeUnit(date, 'h', value);
  }

  public static subtractHours(date: Date, value: number): Date {
    return DateHelper.subtractTimeUnit(date, 'h', value);
  }

  public static setHours(date: Date, value: number): Date {
    return DateHelper.setTimeUnit(date, 'h', value);
  }

  public static getHours(date: Date): number {
    return DateHelper.getTimeUnit(date, 'h');
  }

  public static addDays(date: Date, value: number): Date {
    return DateHelper.addTimeUnit(date, 'd', value);
  }

  public static subtractDays(date: Date, value: number): Date {
    return DateHelper.subtractTimeUnit(date, 'd', value);
  }

  public static setDaysOfWeek(date: Date, value: number): Date {
    return DateHelper.setTimeUnit(date, 'day', value);
  }

  public static setDaysOfMonth(date: Date, value: number): Date {
    return DateHelper.setTimeUnit(date, 'date', value);
  }

  public static getDaysOfWeek(date: Date): number {
    return DateHelper.getTimeUnit(date, 'day');
  }

  public static getDaysOfMonth(date: Date): number {
    return DateHelper.getTimeUnit(date, 'date');
  }

  public static addMonths(date: Date, value: number): Date {
    return DateHelper.addTimeUnit(date, 'M', value);
  }

  public static subtractMonths(date: Date, value: number): Date {
    return DateHelper.subtractTimeUnit(date, 'M', value);
  }

  public static setMonths(date: Date, value: number): Date {
    return DateHelper.setTimeUnit(date, 'M', value);
  }

  public static getMonths(date: Date): number {
    return DateHelper.getTimeUnit(date, 'M');
  }

  public static addYears(date: Date, value: number): Date {
    return DateHelper.addTimeUnit(date, 'y', value);
  }

  public static subtractYears(date: Date, value: number): Date {
    return DateHelper.subtractTimeUnit(date, 'y', value);
  }

  public static setYears(date: Date, value: number): Date {
    return DateHelper.setTimeUnit(date, 'y', value);
  }

  public static getYears(date: Date): number {
    return DateHelper.getTimeUnit(date, 'y');
  }

  private static addTimeUnit(date: Date, unit: UnitType, value: number): Date {
    return dayjs(date).add(value, unit).toDate();
  }

  private static subtractTimeUnit(date: Date, unit: UnitType, value: number): Date {
    return dayjs(date).subtract(value, unit).toDate();
  }

  private static setTimeUnit(date: Date, unit: UnitType, value: number): Date {
    return dayjs(date).set(unit, value).toDate();
  }

  private static getTimeUnit(date: Date, unit: UnitType): number {
    return dayjs(date).get(unit);
  }
}
