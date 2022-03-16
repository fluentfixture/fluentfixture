export class TypeUtils {

  public static isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  public static isString(str: string): boolean {
    return typeof str === 'string';
  }

  public static isNonEmptyString(str: string): boolean {
    return TypeUtils.isString(str) && str !== '';
  }

  public static isNonBlankString(str: string): boolean {
    return TypeUtils.isString(str) && str.trim() != '';
  }

  public static isDate(date: Date): boolean {
    return date instanceof Date && TypeUtils.isInteger(date.getTime());
  }

  public static isObject(obj: Object): boolean {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  public static isInteger(num: number): boolean {
    return typeof num === 'number' && Number.isInteger(num);
  }

  public static isNumber(num: number): boolean {
    return typeof num === 'number' && num > Number.NEGATIVE_INFINITY && num < Number.POSITIVE_INFINITY;
  }

  public static isAssigned(val: any): boolean {
    return val !== undefined && val !== null;
  }

  public static isFunction(fn: Function): boolean {
    return typeof fn === 'function';
  }

  public static isSymbol(symbol: Symbol): boolean {
    return typeof symbol === 'symbol' || (typeof symbol === 'object' && Object.prototype.toString.call(symbol) === '[object Symbol]');
  }
}
