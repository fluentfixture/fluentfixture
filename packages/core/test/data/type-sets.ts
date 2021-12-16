export const NON_NUMBER_DATA_SET = [null, undefined, [], { }, Number.NaN, new Date(), /[A-Z]/, '', true, () => true, Symbol.for('key')];
export const NON_INTEGER_DATA_SET = [null, undefined, [], { }, 1.2, Number.NaN, new Date(), /[A-Z]/, '', true, () => true, Symbol.for('key')];
export const NON_FUNCTION_DATA_SET = [null, undefined, [], { }, 1.2, Number.NaN, new Date(), /[A-Z]/, '', true, Symbol.for('key')];
export const NON_DATE_DATA_SET = [null, undefined, [], { }, 1.2, Number.NaN, /[A-Z]/, '', true, () => true, Symbol.for('key')];
export const NON_OBJECT_DATA_SET = [null, undefined, [], 1.2, Number.NaN, new Date(), /[A-Z]/, '', true, () => true, Symbol.for('key')];
export const NON_FACTORY_LIKE_DATA_SET = [null, undefined, [], { }, 1.2, Number.NaN, new Date(), /[A-Z]/, '', true, () => true, Symbol.for('key')];
export const NON_PROPERTY_DATA_SET = [null, undefined, [], { }, Number.NaN, '', new Date(), /[A-Z]/, '', true, () => true];
export const NON_NON_EMPTY_STRING_DATA_SET = [null, undefined, [], { }, 1.2, Number.NaN, '', new Date(), /[A-Z]/, '', true, () => true, , Symbol.for('key')];
