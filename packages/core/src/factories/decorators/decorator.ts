import { Factory } from '../factory';
import { IFactory } from '../interfaces/factory';
import { Assert } from '../../utils/assert';

/**
 * Decorator is base class of all decorators.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/decorators|Decorators}
 * @class
 * @abstract
 * @template T, K
 */
export abstract class Decorator<T = any, K = any> extends Factory<K> {
  protected readonly factory: IFactory<T>;

  /**
   * Creates an instance of `Decorator`.
   * @constructor
   * @param {IFactory.<T>} [factory] - the factory to be decorated
   */
  protected constructor(factory: IFactory<T>) {
    Assert.isFactoryLike('Decorator.constructor(factory)', 'factory', factory);
    super();
    this.factory = factory;
  }

  /**
   * Returns the decorated `Factory`.
   * @see IFactory
   * @returns {IFactory.<T>}
   */
  public getFactory(): IFactory<T> {
    return this.factory;
  }
}
