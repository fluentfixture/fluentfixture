export const NON_OBJECT_DATA_SET = [null, undefined, [], 1.2, Number.NaN, new Date(), /[A-Z]/, '', true, () => true, Symbol.for('key')];
export const NON_NON_EMPTY_STRING_DATA_SET = [null, undefined, [], { }, 1.2, Number.NaN, '', new Date(), /[A-Z]/, '', true, () => true, Symbol.for('key')];
export const NON_NON_BLANK_STRING_DATA_SET = [null, undefined, [], { }, 1.2, Number.NaN, '', new Date(), /[A-Z]/, ' ', true, () => true, Symbol.for('key')];
export const NON_FUNCTION_DATA_SET = [null, undefined, [], { }, 1.2, Number.NaN, new Date(), /[A-Z]/, '', true, Symbol.for('key')];
