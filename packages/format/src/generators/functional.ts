import { TypeUtils } from '@fluentfixture/shared';
import { GeneratorFunction } from './types/generator-function';
import { Generator } from './generator';

/**
 * `Functional` accepts generator function and use while generating the input.
 * @class
 * @template T, K
 * @extends Generator.<T,K>
 */
export class Functional<T = any, K = any> extends Generator<T, K> {
  private readonly generator: GeneratorFunction<T, K>;

  /**
   * Creates an instance of `Functional`.
   * @constructor
   * @param {function(T):K} [generator] - generator function
   */
  public constructor(generator: GeneratorFunction<T, K>) {
    if (!TypeUtils.isFunction(generator)) {
      throw new Error('Generator must be a function!');
    }
    super();
    this.generator = generator;
  }

  /**
   * Generates a value by using the given generator function.
   * @public
   * @param {T} [input] - input
   * @returns {K}
   */
  public process(input: T): K {
    return this.generator(input);
  }

  /**
   * Returns the given generator function.
   * @returns {function(T):K}
   */
  public getGeneratorFunction(): GeneratorFunction<T, K> {
    return this.generator;
  }
}
