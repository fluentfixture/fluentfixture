import { Assert } from '../../utils/assert';
import { ConsumerFunction } from '../../types/consumer-function';
import { Factory } from '../factory';
import { Decorator } from './decorator';

/**
 * `Exporter` decorator decorates a factory with the exporter function.
 * When the `single()` method is invoked, it generates data using the decorated factory and passes the result into the given function as input,
 * then returns the same result.
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
   * @param {Factory.<T>} [factory] - the factory to be decorated
   * @param {function(T):void} [fn] - the function that receives the result
   */
  public constructor(factory: Factory<T>, fn: ConsumerFunction<T>) {
    Assert.isFunction('Exporter.constructor(factory, fn)', 'fn', fn);
    super(factory);
    this.fn = fn;
  }

  /**
   * Generates single data by using the decorated factory
   * @see Factory
   * @public
   * @returns {T}
   */
  public single(): T {
    const value = this.factory.single();
    this.fn(value);
    return value;
  }

  /**
   * Returns the exporter function.
   * @public
   * @returns {function(T):void}
   */
  public getFunction(): ConsumerFunction<T> {
    return this.fn;
  }
}
