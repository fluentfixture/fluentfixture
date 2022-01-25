import { IFactory } from '../interfaces/factory';
import { ConvertFunction } from '../../types/convert-function';
import { Assert } from '../../utils/assert';
import { Decorator } from './decorator';

/**
 * The `Functional` decorator is one of the most commonly used decorator types in the FluentFixture.
 * It takes a factory and a function. When decorator is invoked, invokes the factory and passes the result to the function as input, returns the result of the function.
 * The `Functional` decorator does not store a state and, by design, shouldn't alter the result of the given factory.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/decorators|Decorators}
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/decorators/functional|Docs}
 * @class
 * @template T, K
 * @extends Decorator.<T,K>
 */
export class Functional<T = any, K = any> extends Decorator<T, K> {
  private readonly fn: ConvertFunction<T, K>;

  /**
   * Creates an instance of `Functional`.
   * @constructor
   * @param {IFactory.<T>} [factory] - the factory to be decorated
   * @param {function(T):K} [fn] - the converter function
   */
  public constructor(factory: IFactory<T>, fn: ConvertFunction<T, K>) {
    Assert.isFunction('Functional.constructor(factory, fn)', 'fn', fn);
    super(factory);
    this.fn = fn;
  }

  /**
   * Generates a data by using the decorated `Factory`.
   * @see IFactory
   * @returns {K}
   */
  public single(): K {
    return this.fn(this.factory.single());
  }

  /**
   * Returns the converter function.
   * @returns {function(T):K}
   */
  public getFunction(): ConvertFunction<T, K> {
    return this.fn;
  }
}
