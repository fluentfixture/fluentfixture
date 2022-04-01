import { TypeEnum } from './types/type-enum';

export class TypeUtils {

  public static isString(str: unknown): str is string {
    return typeof str === 'string';
  }

  public static isDate(date: unknown): date is Date {
    return date instanceof Date && TypeUtils.isInteger(date.getTime());
  }

  public static isObject(obj: unknown): obj is Object {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  public static isNumber(num: unknown): num is number {
    return typeof num === 'number' && num > Number.NEGATIVE_INFINITY && num < Number.POSITIVE_INFINITY;
  }

  public static isFunction(fn: unknown): fn is Function {
    return typeof fn === 'function';
  }

  public static isBoolean(bool: unknown): bool is boolean {
    return typeof bool === 'boolean';
  }

  public static isSymbol(symbol: unknown): symbol is Symbol {
    return typeof symbol === 'symbol' || (typeof symbol === 'object' && Object.prototype.toString.call(symbol) === '[object Symbol]');
  }

  public static isInteger(num: unknown): num is number {
    return TypeUtils.isNumber(num) && Number.isInteger(num);
  }

  public static isNull(val: unknown): val is null {
    return val === null;
  }

  public static isUndefined(val: unknown): val is undefined {
    return typeof val === 'undefined';
  }

  public static isArray(arr: unknown): arr is Array<any> {
    return Array.isArray(arr);
  }

  public static isAssigned(val: unknown): boolean {
    return !TypeUtils.isNull(val) && !TypeUtils.isUndefined(val);
  }

  public static isNonEmptyString(str: unknown): str is string {
    return TypeUtils.isString(str) && str !== '';
  }

  public static isNonBlankString(str: unknown): str is string {
    return TypeUtils.isString(str) && str.trim() != '';
  }

  public static isInRange(val: number, min: number, max: number): boolean {
    return val >= min && val <= max;
  }

  public static getType(val: unknown): TypeEnum {
    let type: TypeEnum;

    if (TypeUtils.isNull(val)) {
      type = TypeEnum.NULL;
    } else if (TypeUtils.isUndefined(val)) {
      type = TypeEnum.UNDEFINED;
    } else if (TypeUtils.isString(val)) {
      type = TypeEnum.STRING;
    } else if (TypeUtils.isNumber(val)) {
      type = TypeEnum.NUMBER;
    } else if (TypeUtils.isDate(val)) {
      type = TypeEnum.DATE;
    } else if (TypeUtils.isSymbol(val)) {
      type = TypeEnum.SYMBOL;
    } else if (TypeUtils.isBoolean(val)) {
      type = TypeEnum.BOOLEAN;
    } else if (TypeUtils.isArray(val)) {
      type = TypeEnum.ARRAY;
    } else if (TypeUtils.isFunction(val)) {
      type = TypeEnum.FUNCTION;
    } else if (TypeUtils.isObject(val)) {
      type = TypeEnum.OBJECT;
    } else {
      type = TypeEnum.UNKNOWN
    }

    return type;
  }
}
