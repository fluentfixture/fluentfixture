import { Factory } from '../factory';
import { IFactory } from '../interfaces/factory';
import { Random } from '../../engine/random';
import { Assert } from '../../utils/assert';
import { MAX_PERCENTAGE, MIN_PERCENTAGE } from '../../constants/limits';

/**
 * `Selector` decorator decorates two factories and selects one of them by using the given percentage.
 * When the `single()` method is invoked, it generates data by using the selected factory.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/factories/decorators|Decorators}
 * @class
 * @template T, K
 * @extends Factory.<T|K>
 */
export class Selector<T = any, K = any> extends Factory<T | K> {
  private readonly factory1: IFactory<T>;
  private readonly factory2: IFactory<K>;
  private readonly percentage: number;

  /**
   * Creates an instance of `Selector`.
   * @constructor
   * @param {IFactory.<T>} [factory1] - the first factory to be decorated
   * @param {IFactory.<K>} [factory2] - the second factory to be decorated
   * @param {number} [percentage] - a number within [0, 1] of how often the result should be true
   */
  public constructor(factory1: IFactory<T>, factory2: IFactory<K>, percentage: number) {
    Assert.isNumber('Selector.constructor(factory1, factory2, percentage)', 'percentage', percentage);
    Assert.isInRange('Selector.constructor(factory1, factory2, percentage)', 'percentage', percentage, MIN_PERCENTAGE, MAX_PERCENTAGE);
    Assert.isFactoryLike('Selector.constructor(factory1, factory2, percentage)', 'factory1', factory1);
    Assert.isFactoryLike('Selector.constructor(factory1, factory2, percentage)', 'factory2', factory2);
    super();
    this.factory1 = factory1;
    this.factory2 = factory2;
    this.percentage = percentage;
  }

  /**
   * Generates single data by using one of the given factories.
   * @see IFactory
   * @public
   * @returns {T|K}
   */
  public single(): T | K {
    return Random.bool(this.percentage)
      ? this.factory1.single()
      : this.factory2.single();
  }

  /**
   * Returns the percentage.
   * @public
   * @returns {number}
   */
  public getPercentage(): number {
    return this.percentage;
  }

  /**
   * Returns the first decorated factory.
   * @see IFactory
   * @public
   * @returns {IFactory.<T>}
   */
  public getFactory1(): IFactory<T> {
    return this.factory1;
  }

  /**
   * Returns the second decorated factory.
   * @see IFactory
   * @public
   * @returns {IFactory.<K>}
   */
  public getFactory2(): IFactory<K> {
    return this.factory2;
  }
}
