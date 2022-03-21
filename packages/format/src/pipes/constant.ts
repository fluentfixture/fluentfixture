import { Pipe } from './pipe';

/**
 * `Constant` returns the given value regardless of the input.
 * @class
 * @template T
 * @extends Pipe.<T,T>
 */
export class Constant<T = any> extends Pipe<T, T> {
  private readonly value: T;

  /**
   * Creates an instance of `Constant`.
   * @constructor
   * @param {T} [value] - value
   */
  public constructor(value: T) {
    super();
    this.value = value;
  }

  /**
   * Returns the given value regardless of the input.
   * @public
   * @returns {T}
   */
  public handle(): T {
    return this.value;
  }

  /**
   * Returns the given value.
   * @public
   * @returns {T}
   */
  public getValue(): T {
    return this.value;
  }
}
