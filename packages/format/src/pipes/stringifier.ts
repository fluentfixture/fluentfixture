import { TypeUtils } from '@fluentfixture/shared';
import { Pipe } from './pipe';

/**
 * `Stringifier` pipe converts any input into string.
 * @class
 * @template T
 * @extends Pipe.<T,string>
 */
export class Stringifier<T = any> extends Pipe<T, string> {

  /**
   * Converts the given input into string.
   * @public
   * @param {T} [input] - input
   * @returns {string}
   */
  public handle(input: T): string {
    return TypeUtils.isString(input)
      ? input
      : TypeUtils.isAssigned(input) ? input.toString() : '';
  }
}
