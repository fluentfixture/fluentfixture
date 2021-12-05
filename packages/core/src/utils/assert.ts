import * as check from 'check-types';

export class Assert {
  public static integer(value: number): void {
    if (check.not.integer(value)) {
      throw new Error('Parameter must be an integer.');
    }
  }

  public static number(value: number): void {
    if (check.not.number(value)) {
      throw new Error('Parameter must be a number.');
    }
  }

  public static inRange(value: number, min: number, max: number): void {
    if (check.not.inRange(value, min, max)) {
      throw new Error(`Parameter must be between ${min} and ${max}.`);
    }
  }

  public static date(date: Date): void {
    if (check.not.date(date)) {
      throw new Error('Parameter must be a date.');
    }
  }

  public static func(value: Function): void {
    if (check.not.function(value)) {
      throw new Error('Parameter must be a function.');
    }
  }

  public static nonEmptyArray(list: ReadonlyArray<any>): void {
    if (check.not.nonEmptyArray(list as any[])) {
      throw new Error('Parameter must be a non-empty array.');
    }
  }
}
