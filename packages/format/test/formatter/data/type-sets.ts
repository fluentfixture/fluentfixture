export const NON_NON_EMPTY_STRING_DATA_SET = [null, undefined, [], { }, 1.2, Number.NaN, '', new Date(), /[A-Z]/, '', true, () => true, Symbol.for('key')];
export const NON_NON_BLANK_STRING_DATA_SET = [null, undefined, [], { }, 1.2, Number.NaN, '', new Date(), /[A-Z]/, ' ', true, () => true, Symbol.for('key')];
export const NON_FUNCTION_DATA_SET = [null, undefined, [], { }, 1.2, Number.NaN, new Date(), /[A-Z]/, '', true, Symbol.for('key')];
export const NON_STRING_DATA_SET = [null, undefined, [], { }, 1.2, Number.NaN, new Date(), /[A-Z]/, true, () => true, Symbol.for('key')];
export const INVALID_FUNCTION_NAME_DATA_SET = ['2string', 'pad-left', 'to.lower', 'to-String', '-lowercase'];
