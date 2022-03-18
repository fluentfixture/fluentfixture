import { Generator } from './generator';

/**
 * `Identity` returns the given value without any modifications.
 * @class
 * @template T
 * @extends Generator.<T,T>
 */
export class Identity<T = any> extends Generator<T, T> {

  /**
   * Returns the given input.
   * @public
   * @param {T} [input] - input
   * @returns {T}
   */
  public process(input: T): T {
    return input;
  }
}
