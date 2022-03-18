import { TypeUtils } from '@fluentfixture/shared';
import { Generator } from './generator';

/**
 * `Stringifier` converts any input into a string value.
 * @class
 * @template T
 * @extends Generator.<T,string>
 */
export class Stringifier<T = any> extends Generator<T, string> {

  /**
   * Converts the given input into a string value.
   * @public
   * @param {T} [input] - input
   * @returns {string}
   */
  public process(input: T): string {
    return TypeUtils.isString(input)
      ? input
      : TypeUtils.isAssigned(input) ? input.toString() : '';
  }
}
