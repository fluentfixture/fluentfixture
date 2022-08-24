import { TypeUtils } from '../../src/types/type-utils';
import {
  NON_ARRAY_DATA_SET,
  NON_BOOLEAN_DATA_SET,
  NON_DATE_DATA_SET,
  NON_FUNCTION_DATA_SET,
  NON_INTEGER_DATA_SET, NON_NON_ASSIGNED_DATA_SET,
  NON_NON_BLANK_STRING_DATA_SET,
  NON_NON_EMPTY_STRING_DATA_SET,
  NON_NULL_DATA_SET,
  NON_NUMBER_DATA_SET,
  NON_OBJECT_DATA_SET,
  NON_STRING_DATA_SET,
  NON_SYMBOL_DATA_SET, NON_UNDEFINED_DATA_SET,
} from '../data/type-sets';

describe('TypeUtils', () => {

  describe('.isString()', () => {

    it('should return true when parameter is a string', () => {
      expect(TypeUtils.isString('')).toBe(true);
    });

    test.each(NON_STRING_DATA_SET)('should return false when parameter is not a string, %p', (str: string) => {
      expect(TypeUtils.isString(str)).toBe(false);
    });
  });

  describe('.isDate()', () => {

    it('should return true when parameter is a date', () => {
      expect(TypeUtils.isDate(new Date())).toBe(true);
    });

    test.each(NON_DATE_DATA_SET)('should return false when parameter is not a date, %p', (date: Date) => {
      expect(TypeUtils.isDate(date)).toBe(false);
    });
  });

  describe('.isObject()', () => {

    it('should return true when parameter is an object', () => {
      expect(TypeUtils.isObject({})).toBe(true);
    });

    test.each(NON_OBJECT_DATA_SET)('should return false when parameter is not an object, %p', (date: Date) => {
      expect(TypeUtils.isObject(date)).toBe(false);
    });
  });

  describe('.isNumber()', () => {

    it('should return true when parameter is a number', () => {
      expect(TypeUtils.isNumber(1)).toBe(true);
    });

    test.each(NON_NUMBER_DATA_SET)('should return false when parameter is not a number, %p', (num: number) => {
      expect(TypeUtils.isNumber(num)).toBe(false);
    });
  });

  describe('.isFunction()', () => {

    it('should return true when parameter is a function', () => {
      expect(TypeUtils.isFunction(() => true)).toBe(true);
    });

    test.each(NON_FUNCTION_DATA_SET)('should return false when parameter is not a function, %p', (fn: Function) => {
      expect(TypeUtils.isFunction(fn)).toBe(false);
    });
  });

  describe('.isBoolean()', () => {

    it('should return true when parameter is a boolean', () => {
      expect(TypeUtils.isBoolean(true)).toBe(true);
    });

    test.each(NON_BOOLEAN_DATA_SET)('should return false when parameter is not a boolean, %p', (bool: boolean) => {
      expect(TypeUtils.isBoolean(bool)).toBe(false);
    });
  });

  describe('.isSymbol()', () => {

    it('should return true when parameter is a symbol', () => {
      expect(TypeUtils.isSymbol(Symbol.for('key'))).toBe(true);
    });

    test.each(NON_SYMBOL_DATA_SET)('should return false when parameter is not a symbol, %p', (sym: Symbol) => {
      expect(TypeUtils.isSymbol(sym)).toBe(false);
    });
  });

  describe('.isNonEmptyString()', () => {

    it('should return true when parameter is a non-empty string', () => {
      expect(TypeUtils.isNonEmptyString('str')).toBe(true);
    });

    test.each(NON_NON_EMPTY_STRING_DATA_SET)('should return false when parameter is not a non-empty string, %p', (str: string) => {
      expect(TypeUtils.isNonEmptyString(str)).toBe(false);
    });
  });

  describe('.isNonBlankString()', () => {

    it('should return true when parameter is a non-blank string', () => {
      expect(TypeUtils.isNonBlankString('str')).toBe(true);
    });

    test.each(NON_NON_BLANK_STRING_DATA_SET)('should return false when parameter is not a non-blank string, %p', (str: string) => {
      expect(TypeUtils.isNonBlankString(str)).toBe(false);
    });
  });

  describe('.isInteger()', () => {

    it('should return true when parameter is an integer', () => {
      expect(TypeUtils.isInteger(1)).toBe(true);
    });

    test.each(NON_INTEGER_DATA_SET)('should return false when parameter is not an integer, %p', (int: number) => {
      expect(TypeUtils.isInteger(int)).toBe(false);
    });
  });

  describe('.isArray()', () => {

    it('should return true when parameter is an array', () => {
      expect(TypeUtils.isArray([])).toBe(true);
    });

    test.each(NON_ARRAY_DATA_SET)('should return false when parameter is not an array, %p', (val: unknown) => {
      expect(TypeUtils.isArray(val)).toBe(false);
    });
  });

  describe('.isNull()', () => {

    it('should return true when parameter is null', () => {
      expect(TypeUtils.isNull(null)).toBe(true);
    });

    test.each(NON_NULL_DATA_SET)('should return false when parameter is not null, %p', (val: unknown) => {
      expect(TypeUtils.isNull(val)).toBe(false);
    });
  });

  describe('.isUndefined()', () => {

    it('should return true when parameter is undefined', () => {
      expect(TypeUtils.isUndefined(undefined)).toBe(true);
    });

    test.each(NON_UNDEFINED_DATA_SET)('should return false when parameter is not undefined, %p', (val: unknown) => {
      expect(TypeUtils.isUndefined(val)).toBe(false);
    });
  });

  describe('.isAssigned()', () => {

    it('should return false when parameter is null', () => {
      expect(TypeUtils.isAssigned(null)).toBe(false);
    });

    it('should return false when parameter is undefined', () => {
      expect(TypeUtils.isAssigned(undefined)).toBe(false);
    });

    test.each(NON_NON_ASSIGNED_DATA_SET)('should return true when parameter is not null or undefined, %p', (val: unknown) => {
      expect(TypeUtils.isAssigned(val)).toBe(true);
    });
  });

  describe('.isInRange()', () => {

    it('should return true when given value is in the given range', () => {
      expect(TypeUtils.isInRange(1, 0.99, 1.01)).toBe(true);
    });

    it('should return false when min value is greater than the max value', () => {
      expect(TypeUtils.isInRange(1, 1.01, 0.99)).toBe(false);
    });
  });
});

