/**
 * `Generator` is base class of all generators.
 * Generator is a builder class that may accept a value and generate another value.
 * @class
 * @abstract
 * @template T,K
 */
export abstract class Generator<T = any, K = any> {

  /**
   * Generates a value by using the given value or generates a new one.
   * @public
   * @abstract
   * @param {T=} [input] - input value
   * @returns {K}
   */
  public abstract process(input?: T): K;
}
