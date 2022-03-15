import { Factory } from '../factory';
import { Random } from '../../engine/random';
import { Assert } from '../../utils/assert';
import { MAX_PERCENTAGE, MIN_PERCENTAGE } from '../../constants/limits';

/**
 * `Selector` decorator decorates two factories and selects one of them by using the given percentage.
 * When the `single()` method is invoked, it generates data by using the selected factory.
 * @class
 * @template T, K
 * @extends Factory.<T|K>
 */
export class Selector<T = any, K = any> extends Factory<T | K> {
  private readonly factory1: Factory<T>;
  private readonly factory2: Factory<K>;
  private readonly percentage: number;

  /**
   * Creates an instance of `Selector`.
   * @constructor
   * @param {Factory.<T>} [factory1] - the first factory to be decorated
   * @param {Factory.<K>} [factory2] - the second factory to be decorated
   * @param {number} [percentage] - a number within [0, 1] of how often the result should be true
   */
  public constructor(factory1: Factory<T>, factory2: Factory<K>, percentage: number) {
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
   * @see Factory
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
   * @see Factory
   * @public
   * @returns {Factory.<T>}
   */
  public getFactory1(): Factory<T> {
    return this.factory1;
  }

  /**
   * Returns the second decorated factory.
   * @see Factory
   * @public
   * @returns {Factory.<K>}
   */
  public getFactory2(): Factory<K> {
    return this.factory2;
  }
}
