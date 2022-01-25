import { Assert } from '../utils/assert';
import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from '../constants/limits';
import { IFactory } from './interfaces/factory';

/**
 * `Factory` is base class for all factory-like types.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/factories|Docs}
 * @class
 * @abstract
 * @template T
 * @implements {IFactory.<T>}
 */
export abstract class Factory<T = any> implements IFactory<T> {

  /**
   * Generates single mock data.
   * @public
   * @abstract
   * @returns {T}
   */
  public abstract single(): T;

  /**
   * Generates list of mock data.
   * @public
   * @param {number} [count=10] the count of mock data to be generated
   * @returns {T[]}
   */
  public many(count: number): ReadonlyArray<T> {
    Assert.isInteger('Factory.many(count)', 'count', count);
    Assert.isInRange('Factory.many(count)', 'count', count, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE);
    return Array.from({ length: count }, () => this.single());
  }
}
