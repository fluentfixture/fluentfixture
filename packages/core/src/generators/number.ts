import { DEFAULT_MAX_NUMBER, DEFAULT_MIN_NUMBER } from '../constants/limits';
import { NumberStream } from '../streams/stream-loader';
import { IntegerFactory } from '../factories/integer-factory';

/**
 * Creates a `NumberStream` that generates a float number with the given boundaries.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/number-generators#real-min-max|Docs}
 * @see NumberStream
 * @param {number} [min=0] - the minimum of the boundary
 * @param {number} [max=1000] - the maximum of the boundary
 * @returns {NumberStream}
 */
export const real = (min: number = DEFAULT_MIN_NUMBER, max: number = DEFAULT_MAX_NUMBER): NumberStream => NumberStream.between(min, max);

/**
 * Creates a `NumberStream` that generates an integer number with the given boundaries.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/number-generators#int-min-max|Docs}
 * @see NumberStream
 * @param {number} [min=0] - the minimum of the boundary
 * @param {number} [max=1000] - the maximum of the boundary
 * @returns {NumberStream}
 */
export const int = (min: number = DEFAULT_MIN_NUMBER, max: number = DEFAULT_MAX_NUMBER): NumberStream => new NumberStream(new IntegerFactory(min, max));

/**
 * Creates a `NumberStream` that generates always the given number.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/number-generators#num-val|Docs}
 * @see NumberStream
 * @param {number} [val] - the number to be generated
 * @returns {NumberStream}
 */
export const num = (val: number): NumberStream => NumberStream.constant(val);

/**
 * Creates a `NumberStream` that generates always zero.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/number-generators#zero|Docs}
 * @see NumberStream
 * @returns {NumberStream}
 */
export const zero = (): NumberStream => NumberStream.constant(0);

/**
 * Creates a `NumberStream` that generates always one.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/number-generators#one|Docs}
 * @see NumberStream
 * @returns {NumberStream}
 */
export const one = (): NumberStream => NumberStream.constant(1);
