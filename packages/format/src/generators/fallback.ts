import { TypeUtils } from '@fluentfixture/shared';
import { Generator } from './generator';

/**
 * `Fallback` returns the given fallback when parameter is null or undefined.
 * @class
 * @template T
 * @extends Generator.<T,T>
 */
export class Fallback<T = any> extends Generator<T> {
  private readonly value: T;

  /**
   * Creates an instance of `Fallback`.
   * @constructor
   * @param {T} [value] - value
   */
  public constructor(value: T) {
    super();
    this.value = value;
  }

  /**
   * Returns the given fallback when parameter is null or undefined.
   * @public
   * @param {T=} [input] - input
   * @returns {T}
   */
  public process(input?: T): T {
    return TypeUtils.isAssigned(input) ? input : this.value;
  }
}
