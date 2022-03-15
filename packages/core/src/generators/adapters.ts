import { ArrayStream, Stream } from '../streams/stream-loader';
import { ProducerFunction } from '../types/producer-function';
import { DEFAULT_SAMPLE_COUNT } from '../constants/limits';

/**
 * Creates a `Stream.<null>` that generates always null.
 * @see Stream
 * @public
 * @returns {Stream.<null>}
 */
export const nil = (): Stream<null> => val(null);

/**
 * Creates a `Stream.<undefined>` that generates always undefined.
 * @see Stream
 * @public
 * @returns {Stream.<undefined>}
 */
export const undef = (): Stream<undefined> => val();

/**
 * Creates a `Stream.<T>` that generates always the given value.
 * @see Stream
 * @public
 * @template T
 * @param {T} [value=undefined] - the value to be generated
 * @returns {Stream.<T>}
 */
export const val = <T = any>(value?: T): Stream<T> => Stream.fromValue(value);

/**
 * Creates a `Stream.<T>` that generates always the result of the given function.
 * @see Stream
 * @public
 * @template T
 * @param {function():T} [fn] - the function to be invoked for generating data
 * @returns {Stream.<T>}
 */
export const from = <T = any>(fn: ProducerFunction<T>): Stream<T> => Stream.fromResult(fn);

/**
 * Creates a `Stream.<T>` that picks an item from the given array.
 * @see Stream
 * @public
 * @template T
 * @param {T[]} [array] - an array that a random element will be selected
 * @returns {Stream.<T>}
 */
export const pick = <T = any>(array: ReadonlyArray<T>): Stream<T> => ArrayStream.fromList(array).pick();

/**
 * Creates an `ArrayStream.<T>` that selects random items from the given array with the given count.
 * @see ArrayStream
 * @public
 * @template T
 * @param {T[]} [array] - an array that random elements will be selected
 * @param {number} [count=10] - the item count
 * @returns {ArrayStream.<T>}
 */
export const take = <T = any>(array: ReadonlyArray<T>, count: number = DEFAULT_SAMPLE_COUNT): ArrayStream<T> => ArrayStream.fromList(array).sample(count);

/**
 * Creates an `ArrayStream.<T>` that shuffles the given array.
 * @see ArrayStream
 * @public
 * @template T
 * @param {T[]} [array] - an array to be shuffled
 * @returns {ArrayStream.<T>}
 */
export const shuffle = <T = any>(array: ReadonlyArray<T>): ArrayStream<T> => ArrayStream.fromList(array).shuffle();
