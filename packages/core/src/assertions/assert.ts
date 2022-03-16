import { TypeUtils } from '@fluentfixture/shared';
import { Factory } from '../factories/factory';

export class Assert {

  public static isInteger(context: string, name: string, value: number): void {
    if (!TypeUtils.isInteger(value)) {
      Assert.throwError(context, name, 'Parameter must be an integer!');
    }
  }

  public static isNumber(context: string, name: string, value: number): void {
    if (!TypeUtils.isNumber(value)) {
      Assert.throwError(context, name, 'Parameter must be a number!');
    }
  }

  public static isInRange(context: string, name: string, value: number, min: number, max: number): void {
    if (!TypeUtils.isInRange(value, min, max)) {
      Assert.throwError(context, name, `Parameter must be between ${min} and ${max}!`);
    }
  }

  public static isDate(context: string, name: string, date: Date): void {
    if (!TypeUtils.isDate(date)) {
      Assert.throwError(context, name, 'Parameter must be a date!');
    }
  }

  public static isFunction(context: string, name: string, value: Function): void {
    if (!TypeUtils.isFunction(value)) {
      Assert.throwError(context, name, 'Parameter must be a function!');
    }
  }

  public static isObjectModel(context: string, name: string, obj: Record<string, Factory>): void {
    if (!TypeUtils.isObject(obj)) {
      Assert.throwError(context, name, 'Parameter must be a key-value object that all keys are an instance of a factory-like!');
    }
    for (const key of Object.keys(obj)) {
      if (!TypeUtils.isAssigned(obj[key]) || !TypeUtils.isFunction((obj[key] as Factory).single)) {
        Assert.throwError(context, name, 'Parameter must be a key-value object that all keys are an instance of a factory-like!');
      }
    }
  }

  public static isFactoryLike(context: string, name: string, factory: Factory): void {
    if (!TypeUtils.isAssigned(factory) || !TypeUtils.isAssigned(factory.single)) {
      Assert.throwError(context, name, 'Parameter must be a factory-like!');
    }
  }

  public static isKey(context: string, name: string, value: keyof any): void {
    if (!TypeUtils.isNonEmptyString(value as string) && !TypeUtils.isNumber(value as number) && !TypeUtils.isSymbol(value as Symbol)) {
      Assert.throwError(context, name, 'Parameter must be a string, number or symbol!');
    }
  }

  public static isNonEmptyString(context: string, name: string, value: string): void {
    if (!TypeUtils.isNonEmptyString(value)) {
      Assert.throwError(context, name, 'Parameter must be a non-empty string!');
    }
  }

  private static throwError(context: string, name: string, message: string): never {
    throw new Error(`[${context}].[${name}]: ${message}`)
  }
}
