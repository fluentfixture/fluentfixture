import { ArrayStream, Stream } from '../streams/stream-loader';
import { ProducerFunction } from '../types/producer-function';
import { DEFAULT_SAMPLE_COUNT } from '../constants/limits';

/**
 * Creates a `Stream` that generates always null.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/adapters#nil|Docs}
 * @returns {Stream} Stream
 */
export const nil = (): Stream<null> => val(null);

/**
 * Creates a `Stream` that generates always undefined.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/adapters#undef|Docs}
 * @returns {Stream} Stream
 */
export const undef = (): Stream<undefined> => val();

/**
 * Creates a `Stream` that generates always the given value.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/adapters#val-value|Docs}
 * @param {*} [value=undefined] - the value to be generated
 * @returns {Stream} Stream
 */
export const val = <T = any>(value?: T): Stream<T> => Stream.fromValue(value);

/**
 * Creates a `Stream` that generates always the result of the given function.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/adapters#from-fn|Docs}
 * @param {function} [fn] - the function to be invoked for generating data
 * @returns {Stream} Stream
 */
export const from = <T = any>(fn: ProducerFunction<T>): Stream<T> => Stream.fromResult(fn);

/**
 * Creates a `Stream` that picks an item from the given array.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/array-generators#pick-array|Docs}
 * @param {*[]} [array] - an array that a random element will be selected
 * @returns {Stream} Stream
 */
export const pick = <T = any>(array: ReadonlyArray<T>): Stream<T> => ArrayStream.fromList(array).pick();

/**
 * Creates an `ArrayStream` that selects random items from the given array with the given count.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/array-generators#take-array-count|Docs}
 * @param {*[]} [array] - an array that random elements will be selected
 * @param {number} [count=10] - the item count
 * @returns {ArrayStream} ArrayStream
 */
export const take = <T = any>(array: ReadonlyArray<T>, count: number = DEFAULT_SAMPLE_COUNT): ArrayStream<T> => ArrayStream.fromList(array).sample(count);

/**
 * Creates an `ArrayStream` that shuffles the given array.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/array-generators#shuffle-array|Docs}
 * @param {*[]} [array] - an array to be shuffled
 * @returns {ArrayStream} ArrayStream
 */
export const shuffle = <T = any>(array: ReadonlyArray<T>): ArrayStream<T> => ArrayStream.fromList(array).shuffle();
