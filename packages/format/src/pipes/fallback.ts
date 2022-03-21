import { TypeUtils } from '@fluentfixture/shared';
import { Pipe } from './pipe';

/**
 * `Fallback` returns the given fallback value when the input is null or undefined.
 * @class
 * @template T
 * @extends Pipe.<T,T>
 */
export class Fallback<T = any> extends Pipe<T> {
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
   * Returns the given fallback value when the input is null or undefined.
   * @public
   * @param {T=} [input] - input
   * @returns {T}
   */
  public handle(input?: T): T {
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
