import { ProducerFunction } from '../../types/producer-function';
import { Factory } from '../factory';
import { Assert } from '../../utils/assert';

/**
 * `FunctionAdapter` adapter accepts a function.
 * When the `single()` method is invoked, it invokes the given function and returns the result.
 * @class
 * @template T
 * @extends Factory.<T>
 */
export class FunctionAdapter<T> extends Factory<T> {
  private readonly fn: ProducerFunction<T>;

  /**
   * Creates an instance of `FunctionAdapter`.
   * @constructor
   * @param {function():T} [fn] - the producer function
   */
  public constructor(fn: ProducerFunction<T>) {
    Assert.isFunction('FunctionAdapter.constructor(fn)', 'fn', fn);
    super();
    this.fn = fn;
  }

  /**
   * Generates single data by using the given function.
   * @public
   * @returns {T}
   */
  public single(): T {
    return this.fn();
  }

  /**
   * Returns the producer function.
   * @public
   * @returns {function():T}
   */
  public getFunction(): ProducerFunction<T> {
    return this.fn;
  }
}
