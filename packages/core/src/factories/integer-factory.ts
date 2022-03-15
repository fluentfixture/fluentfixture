import { Random } from '../engine/random';
import { Assert } from '../utils/assert';
import { MAX_INTEGER, MIN_INTEGER } from '../constants/limits';
import { Factory } from './factory';

/**
 * `IntegerFactory` generates an `integer` within the given boundary.
 * @see Factory
 * @class
 * @extends {Factory.<number>}
 */
export class IntegerFactory extends Factory<number> {
  private readonly min: number;
  private readonly max: number;

  /**
   * Creates an instance of `IntegerFactor`.
   * @constructor
   * @param {number} [min] - the minimum of the boundary
   * @param {number} [max] - the maximum of the boundary
   */
  public constructor(min: number, max: number) {
    Assert.isInteger('IntegerFactory.constructor(min, max)', 'min', min);
    Assert.isInRange('IntegerFactory.constructor(min, max)', 'min', min, MIN_INTEGER, MAX_INTEGER);
    Assert.isInteger('IntegerFactory.constructor(min, max)', 'max', max);
    Assert.isInRange('IntegerFactory.constructor(min, max)', 'max', max, MIN_INTEGER, MAX_INTEGER);
    super();
    this.min = min;
    this.max = max;
  }

  /**
   * Generates single integer.
   * @public
   * @returns {number}
   */
  public single(): number {
    return Random.integer(this.min, this.max);
  }

  /**
   * Returns the minimum of the boundary.
   * @public
   * @returns {number}
   */
  public getMin(): number {
    return this.min;
  }

  /**
   * Returns the maximum of the boundary.
   * @public
   * @returns {number}
   */
  public getMax(): number {
    return  this.max;
  }
}
