import { Random } from '../engine/random';
import { Assert } from '../utils/assert';
import { MAX_INTEGER, MIN_INTEGER } from '../constants/limits';
import { Factory } from './factory';

/**
 * `NumberFactory` generates a `float` within the given boundary.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/factories/creators/number-factory|Docs}
 * @see Factory
 * @class
 * @extends {Factory.<number>}
 */
export class NumberFactory extends Factory<number> {
  private readonly min: number;
  private readonly max: number;

  /**
   * Creates an instance of `NumberFactory`.
   * @constructor
   * @param {number} [min] - the minimum of the boundary
   * @param {number} [max] - the maximum of the boundary
   */
  public constructor(min: number, max: number) {
    Assert.isNumber('NumberFactory.constructor(min, max)', 'min', min);
    Assert.isInRange('NumberFactory.constructor(min, max)', 'min', min, MIN_INTEGER, MAX_INTEGER);
    Assert.isNumber('NumberFactory.constructor(min, max)', 'max', max);
    Assert.isInRange('NumberFactory.constructor(min, max)', 'max', max, MIN_INTEGER, MAX_INTEGER);
    super();
    this.min = min;
    this.max = max;
  }

  /**
   * Generates single float.
   * @public
   * @returns {number}
   */
  public single(): number {
    return Random.float(this.min, this.max);
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
