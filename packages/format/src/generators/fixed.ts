import { Generator } from './generator';

/**
 * `Fixed` returns always the same give value.
 * @class
 * @template T
 * @extends Generator.<*,T>
 */
export class Fixed<T = any> extends Generator<any, T> {
  private readonly value: T;

  /**
   * Creates an instance of `Fixed`.
   * @constructor
   * @param {T} [value] - value
   */
  public constructor(value: T) {
    super();
    this.value = value;
  }

  /**
   * Returns always the given value.
   * @public
   * @returns {T}
   */
  public process(): T {
    return this.value;
  }
}
