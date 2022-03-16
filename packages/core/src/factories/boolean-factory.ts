import { Assert } from '../assertions/assert';
import { MAX_PERCENTAGE, MIN_PERCENTAGE } from '../constants/limits';
import { Random } from '../engine/random';
import { Factory } from './factory';

/**
 * `BooleanFactory` generates a `boolean` by using the given percentage.
 * @see Factory
 * @class
 * @extends {Factory.<boolean>}
 */
export class BooleanFactory extends Factory<boolean> {
  private readonly percentage: number;

  /**
   * Creates an instance of `BooleanFactory`.
   * @constructor
   * @param {number} [percentage] - a number within [0, 1] of how often the result should be true
   */
  public constructor(percentage: number) {
    Assert.isNumber('BooleanFactory.constructor(percentage)', 'percentage', percentage);
    Assert.isInRange('BooleanFactory.constructor(percentage)', 'percentage', percentage, MIN_PERCENTAGE, MAX_PERCENTAGE);
    super();
    this.percentage = percentage;
  }

  /**
   * Generates single boolean.
   * @public
   * @returns {boolean}
   */
  public single(): boolean {
    return Random.bool(this.percentage);
  }

  /**
   * Returns the percentage.
   * @public
   * @returns {boolean}
   */
  public getPercentage(): number {
    return this.percentage;
  }
}
