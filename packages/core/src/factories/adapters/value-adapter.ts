import { Factory } from '../factory';

/**
 * `ValueAdapter` adapter accepts any value.
 * When the `single()` method is invoked, it returns the given value.
 * @class
 * @template T
 * @extends Factory.<T>
 */
export class ValueAdapter<T = any> extends Factory<T> {
  private readonly value: T;

  /**
   * Creates an instance of `ValueAdapter`.
   * @constructor
   * @param {T} [value] - the value to be returned
   */
  public constructor(value: T) {
    super();
    this.value = value;
  }

  /**
   * Generates single data by using the given value.
   * @public
   * @returns {T}
   */
  public single(): T {
    return this.value;
  }

  /**
   * Returns the value.
   * @public
   * @returns {T}
   */
  public getValue(): T {
    return this.value;
  }
}
