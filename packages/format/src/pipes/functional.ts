import { TypeUtils } from '@fluentfixture/shared';
import { PipeFunction } from './types/pipe-function';
import { Pipe } from './pipe';

/**
 * `Functional` is a dynamic pipe which accepts a pipe function.
 * @class
 * @template T, K
 * @extends Pipe.<T,K>
 */
export class Functional<T = any, K = any> extends Pipe<T, K> {
  private readonly pipe: PipeFunction<T, K>;

  /**
   * Creates an instance of `Functional`.
   * @constructor
   * @param {function(T):K} [pipe] - pipe function
   */
  public constructor(pipe: PipeFunction<T, K>) {
    if (!TypeUtils.isFunction(pipe)) {
      throw new Error('Pipe must be a function!');
    }
    super();
    this.pipe = pipe;
  }

  /**
   * Handles the given input by using the given pipe function.
   * @public
   * @param {T} [input] - input
   * @returns {K}
   */
  public handle(input: T): K {
    return this.pipe(input);
  }
}
