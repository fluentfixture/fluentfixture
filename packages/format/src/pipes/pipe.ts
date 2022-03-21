/**
 * `Pipe` is a simple pipe class that transforms input or creates a new one.
 * @class
 * @abstract
 * @template T, K
 */
export abstract class Pipe<T = any, K = any> {

  /**
   * Transforms input or creates a new one.
   * @public
   * @abstract
   * @param {T=} [input] - input value
   * @returns {K}
   */
  public abstract handle(input?: T): K;
}
