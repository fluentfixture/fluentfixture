import * as check from 'check-types';

export class Assert {
  public static integer(value: number): void {
    if (check.not.integer(value)) {
      throw new Error('Parameter must be an integer.');
    }
  }

  public static inRange(value: number, min: number, max: number): void {
    if (check.not.between(value, min, max)) {
      throw new Error(`Parameter must be between ${min} and ${max}.`);
    }
  }
}
