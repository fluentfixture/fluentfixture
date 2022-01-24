import { IFactory } from '../factories/interfaces/factory';
import { DEFAULT_ARRAY_SIZE } from '../constants/limits';
import { MapFunction } from '../types/map-function';
import { FilterFunction } from '../types/filter-function';
import { SortFunction } from '../types/sort-function';
import { Iterator } from '../factories/converters/iterator';
import { Functional } from '../factories/converters/functional';
import { Sampler } from '../factories/converters/sampler';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { ArrayHelper } from '../helpers/array-helper';
import { Stream } from './stream-loader';

/**
 * `ArrayStream` extends the `Stream.<T[]>` class for array operations.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/array-stream|Docs}
 * @see Stream
 * @class
 * @template T
 * @extends Stream.<T[]>
 */
export class ArrayStream<T = any> extends Stream<ReadonlyArray<T>> {

  /**
   * Creates an instance of `ArrayStream.<T[]>`.
   * @constructor
   * @param {IFactory.<T[]>} [factory] - the factory to be decorated
   */
  public constructor(factory: IFactory<ReadonlyArray<T>>) {
    super(factory);
  }

  /**
   * Creates an `ArrayStream.<T>` with the given factory and count.
   * @static
   * @param {IFactory.<T>} [factory] - the factory to be decorated
   * @param {number} [count=10] - the length of the array
   * @returns {ArrayStream.<T>}
   */
  public static iterate<T = any>(factory: IFactory<T>, count: number = DEFAULT_ARRAY_SIZE): ArrayStream<T> {
    return new ArrayStream(new Iterator(factory, count));
  }

  /**
   * Creates an `ArrayStream.<T>` that generates always the given array.
   * @static
   * @param {T[]} [array] - the array to be generated
   * @returns {ArrayStream.<T>}
   */
  public static fromList<T = any>(array: ReadonlyArray<T>): ArrayStream<T> {
    return new ArrayStream(new ValueAdapter(array));
  }

  /**
   * Creates an `Stream.<T>` with a `Functional` decorator and the pick operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/array-stream#pick|Docs}
   * @see Stream
   * @see Functional
   * @returns {Stream.<T>}
   */
  public pick(): Stream<T> {
    return Stream.from(new Functional(this, (i) => ArrayHelper.pick(i)));
  }

  /**
   * Creates an `ArrayStream.<T>` with a `Functional` decorator and the sample operator.
   * The result is the subset of the initial array.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/array-stream#sample-size|Docs}
   * @see Functional
   * @param {number} [size=10] - the sample size
   * @returns {ArrayStream.<T>}
   */
  public sample(size: number): ArrayStream<T> {
    return new ArrayStream(new Sampler(this, size));
  }

  /**
   * Creates an `ArrayStream.<T>` with a `Functional` decorator and the shuffle operator.
   * The result array contains the same elements with the initial array but different order.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/array-stream#shuffle|Docs}
   * @see Functional
   * @returns {ArrayStream.<T>}
   */
  public shuffle(): ArrayStream<T> {
    return new ArrayStream(new Functional(this, (i) => ArrayHelper.shuffle(i)));
  }

  /**
   * Creates an `ArrayStream.<T>` with a `Functional` decorator and the sort operator.
   * This method works the same as how `Array#sort()` works.
   * The underlying type of the new stream is the same as the initial stream.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/array-stream#sort-fn|Docs}
   * @see Functional
   * @param {function(T, T):number} [fn=default-sorting-algorithm] - the sort function
   * @returns {ArrayStream.<T>}
   */
  public sort(fn?: SortFunction<T>): ArrayStream<T> {
    return new ArrayStream(new Functional(this, (arr) => [...arr].sort(fn)));
  }

  /**
   * Creates an `ArrayStream.<T>` with a `Functional` decorator and the map operator.
   * This method works the same as how Array#map() works.
   * The underlying type of the new stream is the same as the return type of the given map function.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/array-stream#map-fn|Docs}
   * @see Functional
   * @template T, K
   * @param {function(T, number, T[]):K} [fn] - the map function
   * @returns {ArrayStream.<K>}
   */
  public map<K>(fn: MapFunction<T, K>): ArrayStream<K> {
    return new ArrayStream(new Functional(this, (arr) => arr.map((e, i, a) => fn(e, i ,a))));
  }

  /**
   * Creates an `ArrayStream.<T>` with a `Functional` decorator and the filter operator.
   * This method works the same as how Array#filter() works.
   * The underlying type of the new stream is the same as the initial stream.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/array-stream#filter-fn|Docs}
   * @see Functional
   * @param {function(T, number, T[]):boolean} [fn] - the filter function
   * @returns {ArrayStream.<T>}
   */
  public filter(fn: FilterFunction<T>): ArrayStream<T> {
    return new ArrayStream(new Functional(this, (arr) => arr.filter((e, i, a) => fn(e, i ,a))));
  }
}
