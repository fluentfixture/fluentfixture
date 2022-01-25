import { IFactory } from '../interfaces/factory';
import { Assert } from '../../utils/assert';
import { ConsumerFunction } from '../../types/consumer-function';
import { Decorator } from './decorator';

/**
 * The `Exporter` decorator is a utility decorator that invokes the given function with the result of the underlying factory.
 * It is useful for debugging intermediate results. More about this decorator is covered in the Debugging section.
 * The `Exporter` decorator does not store a state and does not alter the result of the given factory.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/decorators|Decorators}
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/decorators/exporter|Docs}
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/fundamentals/debugging|Debugging}
 * @class
 * @template T
 * @extends Decorator.<T,T>
 */
export class Exporter<T = any> extends Decorator<T, T> {
  private readonly fn: ConsumerFunction<T>;

  /**
   * Creates an instance of `Exporter`.
   * @constructor
   * @param {IFactory.<T>} [factory] - the factory to be decorated
   * @param {function(T):void} [fn] - the function that receives the latest version of mock data
   */
  public constructor(factory: IFactory<T>, fn: ConsumerFunction<T>) {
    Assert.isFunction('Exporter.constructor(factory, fn)', 'fn', fn);
    super(factory);
    this.fn = fn;
  }

  /**
   * Generates a data by using the decorated `Factory`.
   * @see IFactory
   * @returns {T}
   */
  public single(): T {
    const value = this.factory.single();
    this.fn(value);
    return value;
  }

  /**
   * Returns the receiver function.
   * @returns {function(T):void}
   */
  public getFunction(): ConsumerFunction<T> {
    return this.fn;
  }
}
