import { Pipe } from './pipe';

/**
 * `Noop` returns the given value without any modifications.
 * @class
 * @template T
 * @extends Pipe.<T,T>
 */
export class Noop<T = any> extends Pipe<T, T> {

  /**
   * Returns the given value without any modifications.
   * @public
   * @param {T} [input] - input
   * @returns {T}
   */
  public handle(input: T): T {
    return input;
  }
}
