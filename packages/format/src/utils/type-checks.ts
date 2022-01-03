export const isFunction = (fn: Function): boolean => typeof fn === 'function';
export const isNonEmptyString = (str: string): boolean => typeof str === 'string' && str.length > 0;
export const isNonBlankString = (str: string): boolean => typeof str === 'string' && str.trim().length > 0;
