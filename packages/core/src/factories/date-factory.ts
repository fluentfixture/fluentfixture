import { Assert } from '../utils/assert';
import { Random } from '../engine/random';
import { Factory } from './factory';

/**
 * `DateFactory` generates a `date` within the given boundary.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/factories/creators/date-factory|Docs}
 * @see Factory
 * @class
 * @extends {Factory.<Date>}
 */
export class DateFactory extends Factory<Date> {
  private readonly min: Date;
  private readonly max: Date;

  /**
   * Creates an instance of `DateFactory`.
   * @constructor
   * @param {Date} [min] - the minimum of the boundary
   * @param {Date} [max] - the maximum of the boundary
   */
  public constructor(min: Date, max: Date) {
    Assert.isDate('DateFactory.constructor(min, max)', 'min', min);
    Assert.isDate('DateFactory.constructor(min, max)', 'max', max);
    super();
    this.min = min;
    this.max = max;
  }

  /**
   * Generates single date.
   * @public
   * @returns {Date}
   */
  public single(): Date {
    return Random.date(this.min, this.max);
  }

  /**
   * Returns the minimum of the boundary.
   * @public
   * @returns {Date}
   */
  public getMin(): Date {
    return this.min;
  }

  /**
   * Returns the maximum of the boundary.
   * @public
   * @returns {Date}
   */
  public getMax(): Date {
    return  this.max;
  }
}
