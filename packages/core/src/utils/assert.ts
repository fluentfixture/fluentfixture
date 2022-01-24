import { IFactory } from '../factories/interfaces/factory';

export class Assert {

  public static isInteger(context: string, name: string, value: number): void {
    if (!Assert.checkIsInteger(value)) {
      Assert.throwError(context, name, 'Parameter must be an integer!');
    }
  }

  public static isNumber(context: string, name: string, value: number): void {
    if (!Assert.checkIsNumber(value)) {
      Assert.throwError(context, name, 'Parameter must be a number!');
    }
  }

  public static isInRange(context: string, name: string, value: number, min: number, max: number): void {
    if (!Assert.checkIsInRange(value, min, max)) {
      Assert.throwError(context, name, `Parameter must be between ${min} and ${max}!`);
    }
  }

  public static isDate(context: string, name: string, date: Date): void {
    if (!Assert.checkIsDate(date)) {
      Assert.throwError(context, name, 'Parameter must be a date!');
    }
  }

  public static isFunction(context: string, name: string, value: Function): void {
    if (!Assert.checkIsFunction(value)) {
      Assert.throwError(context, name, 'Parameter must be a function!');
    }
  }

  public static isObjectModel(context: string, name: string, obj: Record<string, IFactory>): void {
    if (!Assert.checkIsObject(obj)) {
      Assert.throwError(context, name, 'Parameter must be a key-value object that all keys are an instance of a factory-like!');
    }
    for (const key of Object.keys(obj)) {
      if (!Assert.checkIsAssigned(obj[key]) || !Assert.checkIsFunction((obj[key] as IFactory).single)) {
        Assert.throwError(context, name, 'Parameter must be a key-value object that all keys are an instance of a factory-like!');
      }
    }
  }

  public static isFactoryLike(context: string, name: string, factory: IFactory): void {
    if (!Assert.checkIsAssigned(factory) || !Assert.checkIsFunction(factory.single)) {
      Assert.throwError(context, name, 'Parameter must be a factory-like!');
    }
  }

  public static isKey(context: string, name: string, value: keyof any): void {
    if (!Assert.checkIsNonEmptyString(value as string) && !Assert.checkIsNumber(value as number) && !Assert.checkIsSymbol(value as Symbol)) {
      Assert.throwError(context, name, 'Parameter must be a string, number or symbol!');
    }
  }

  public static isNonEmptyString(context: string, name: string, value: string): void {
    if (!Assert.checkIsNonEmptyString(value)) {
      Assert.throwError(context, name, 'Parameter must be a non-empty string!');
    }
  }

  private static throwError(context: string, name: string, message: string): never {
    throw new Error(`[${context}].[${name}]: ${message}`)
  }

  private static checkIsInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  private static checkIsNonEmptyString(str: string): boolean {
    return typeof str === 'string' && str != '';
  }

  private static checkIsDate(date: Date): boolean {
    return date instanceof Date && Assert.checkIsInteger(date.getTime());
  }

  private static checkIsObject(obj: Object): boolean {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  private static checkIsInteger(num: number): boolean {
    return typeof num === 'number' && Number.isInteger(num);
  }

  private static checkIsNumber(num: number): boolean {
    return typeof num === 'number' && num > Number.NEGATIVE_INFINITY && num < Number.POSITIVE_INFINITY;
  }

  private static checkIsAssigned(val: any): boolean {
    return val !== undefined && val !== null;
  }

  private static checkIsFunction(fn: Function): boolean {
    return typeof fn === 'function';
  }

  private static checkIsSymbol(symbol: Symbol): boolean {
    return typeof symbol === 'symbol' || (typeof symbol === 'object' && Object.prototype.toString.call(symbol) === '[object Symbol]');
  }
}
