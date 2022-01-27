import { Factory } from '../factory';
import { Assert } from '../../utils/assert';

/**
 * Decorator is base class of all decorators.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/factories/decorators|Decorators}
 * @class
 * @abstract
 * @template T, K
 * @extends {Factory.<K>}
 */
export abstract class Decorator<T = any, K = any> extends Factory<K> {
  protected readonly factory: Factory<T>;

  /**
   * Creates an instance of `Decorator`.
   * @constructor
   * @param {Factory.<T>} [factory] - the factory to be decorated
   */
  protected constructor(factory: Factory<T>) {
    Assert.isFactoryLike('Decorator.constructor(factory)', 'factory', factory);
    super();
    this.factory = factory;
  }

  /**
   * Returns the decorated factory.
   * @see Factory
   * @public
   * @returns {Factory.<T>}
   */
  public getFactory(): Factory<T> {
    return this.factory;
  }
}
