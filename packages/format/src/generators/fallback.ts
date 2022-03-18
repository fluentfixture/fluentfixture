import { TypeUtils } from '@fluentfixture/shared';
import { Generator } from './generator';

/**
 * `Fallback` returns the given fallback value when the parameter is null or undefined.
 * @class
 * @template T
 * @extends Generator.<T,T>
 */
export class Fallback<T = any> extends Generator<T> {
  private readonly fallback: T;

  /**
   * Creates an instance of `Fallback`.
   * @constructor
   * @param {T} [fallback] - fallback
   */
  public constructor(fallback: T) {
    super();
    this.fallback = fallback;
  }

  /**
   * Returns the given fallback value when the parameter is null or undefined.
   * @public
   * @param {T=} [input] - input
   * @returns {T}
   */
  public process(input?: T): T {
    return TypeUtils.isAssigned(input) ? input : this.fallback;
  }

  /**
   * Returns the given fallback.
   * @public
   * @returns {T}
   */
  public getFallback(): T {
    return this.fallback;
  }
}
