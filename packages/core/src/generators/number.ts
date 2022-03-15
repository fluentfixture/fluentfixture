import { DEFAULT_MAX_NUMBER, DEFAULT_MIN_NUMBER } from '../constants/limits';
import { NumberStream } from '../streams/stream-loader';
import { IntegerFactory } from '../factories/integer-factory';

/**
 * Creates a `NumberStream` that generates a float number within the given boundary.
 * @see NumberStream
 * @public
 * @param {number} [min=0] - the minimum of the boundary
 * @param {number} [max=1000] - the maximum of the boundary
 * @returns {NumberStream}
 */
export const real = (min: number = DEFAULT_MIN_NUMBER, max: number = DEFAULT_MAX_NUMBER): NumberStream => NumberStream.between(min, max);

/**
 * Creates a `NumberStream` that generates an integer number within the given boundary.
 * @see NumberStream
 * @public
 * @param {number} [min=0] - the minimum of the boundary
 * @param {number} [max=1000] - the maximum of the boundary
 * @returns {NumberStream}
 */
export const int = (min: number = DEFAULT_MIN_NUMBER, max: number = DEFAULT_MAX_NUMBER): NumberStream => new NumberStream(new IntegerFactory(min, max));

/**
 * Creates a `NumberStream` that generates always the given number.
 * @see NumberStream
 * @public
 * @param {number} [val] - the number to be generated
 * @returns {NumberStream}
 */
export const num = (val: number): NumberStream => NumberStream.constant(val);

/**
 * Creates a `NumberStream` that generates always zero.
 * @see NumberStream
 * @public
 * @returns {NumberStream}
 */
export const zero = (): NumberStream => NumberStream.constant(0);

/**
 * Creates a `NumberStream` that generates always one.
 * @see NumberStream
 * @public
 * @returns {NumberStream}
 */
export const one = (): NumberStream => NumberStream.constant(1);
