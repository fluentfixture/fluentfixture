import * as check from 'check-types';
import { IFactory } from '../factories/interfaces/factory';

export class Assert {

  public static isInteger(context: string, name: string, value: number): void {
    if (check.not.integer(value)) {
      Assert.throwError(context, name, 'Parameter must be an integer!');
    }
  }

  public static isNumber(context: string, name: string, value: number): void {
    if (check.not.number(value)) {
      Assert.throwError(context, name, 'Parameter must be a number!');
    }
  }

  public static isInRange(context: string, name: string, value: number, min: number, max: number): void {
    if (check.not.inRange(value, min, max)) {
      Assert.throwError(context, name, `Parameter must be between ${min} and ${max}!`);
    }
  }

  public static isDate(context: string, name: string, date: Date): void {
    if (check.not.date(date)) {
      Assert.throwError(context, name, 'Parameter must be a date!');
    }
  }

  public static isFunction(context: string, name: string, value: Function): void {
    if (check.not.function(value)) {
      Assert.throwError(context, name, 'Parameter must be a function!');
    }
  }

  public static object(value: Object): void {
    if (check.not.object(value)) {
      throw new Error('Parameter must be an object.');
    }
  }

  public static isObjectModel(context: string, name: string, obj: Record<string, IFactory>): void {
    if (check.not.object(obj)) {
      Assert.throwError(context, name, 'Parameter must be a key-value object that all keys are an instance of a factory-like!');
    }
    for (const key of Object.keys(obj)) {
      if (check.not.assigned(obj[key]) || check.not.function((obj[key] as IFactory).single)) {
        Assert.throwError(context, name, 'Parameter must be a key-value object that all keys are an instance of a factory-like!');
      }
    }
  }

  public static isFactoryLike(context: string, name: string, factory: IFactory): void {
    if (check.not.assigned(factory) || check.not.function(factory.single)) {
      Assert.throwError(context, name, 'Parameter must be a factory-like!');
    }
  }

  public static isKey(context: string, name: string, value: keyof any): void {
    if (check.not.nonEmptyString(value as string) && check.not.number(value) && check.not.instance(value, Symbol)) {
      Assert.throwError(context, name, 'Parameter must be a string, number or symbol!');
    }
  }

  public static isNonEmptyString(context: string, name: string, value: string): void {
    if (check.not.nonEmptyString(value as string)) {
      Assert.throwError(context, name, 'Parameter must be a non-empty string!');
    }
  }

  private static throwError(context: string, name: string, message: string): never {
    throw new Error(`[${context}].[${name}]: ${message}`)
  }
}
