import { Assert } from '../../assertions/assert';
import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from '../../constants/limits';
import { Factory } from '../factory';
import { Decorator } from './decorator';

/**
 * `Iterator` decorator decorates a factory with the given count.
 * When the `single()` method is invoked, it generates data using the decorated factory many times.
 * @class
 * @template T
 * @extends Decorator.<T,T[]>
 */
export class Iterator<T = any> extends Decorator<T, ReadonlyArray<T>> {
  private readonly count: number;

  /**
   * Creates an instance of `Iterator`.
   * @constructor
   * @param {Factory.<T>} [factory] - the factory to be decorated
   * @param {number} [count] - the length of the array
   */
  public constructor(factory: Factory<T>, count: number) {
    Assert.isInteger('Iterator.constructor(factory, count)', 'count', count);
    Assert.isInRange('Iterator.constructor(factory, count)', 'count', count, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE);
    super(factory);
    this.count = count;
  }

  /**
   * Generates array of data by using the decorated factory with the given count.
   * @see Factory
   * @returns {T[]}
   */
  public single(): ReadonlyArray<T> {
    return this.factory.many(this.count);
  }

  /**
   * Returns the length of the array.
   * @returns {number}
   */
  public getCount(): number {
    return this.count;
  }
}
