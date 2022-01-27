import { ConvertFunction } from '../../types/convert-function';
import { Assert } from '../../utils/assert';
import { Factory } from '../factory';
import { Decorator } from './decorator';

/**
 * `Functional` decorator decorates a factory with the given function.
 * When the `single()` method is invoked, it generates data using the decorated factory and passes the result into the given function as input,
 * then returns the output of the function.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/factories/decorators|Decorators}
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/factories/decorators/functional|Docs}
 * @class
 * @template T, K
 * @extends Decorator.<T,K>
 */
export class Functional<T = any, K = any> extends Decorator<T, K> {
  private readonly fn: ConvertFunction<T, K>;

  /**
   * Creates an instance of `Functional`.
   * @constructor
   * @param {Factory.<T>} [factory] - the factory to be decorated
   * @param {function(T):K} [fn] - the converter function
   */
  public constructor(factory: Factory<T>, fn: ConvertFunction<T, K>) {
    Assert.isFunction('Functional.constructor(factory, fn)', 'fn', fn);
    super(factory);
    this.fn = fn;
  }

  /**
   * Generates single data by using the decorated factory and the given function.
   * @see Factory
   * @public
   * @returns {K}
   */
  public single(): K {
    return this.fn(this.factory.single());
  }

  /**
   * Returns the converter function.
   * @public
   * @returns {function(T):K}
   */
  public getFunction(): ConvertFunction<T, K> {
    return this.fn;
  }
}
