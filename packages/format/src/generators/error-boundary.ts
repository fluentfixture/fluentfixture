import { Generator } from './generator';

/**
 * `ErrorBoundary` is a generator decorator that ignore errors if occurred.
 * @class
 * @template T, K
 * @extends Generator.<T,K|undefined>
 */
export class ErrorBoundary<T = any, K = any> extends Generator<T, K | undefined> {
  private readonly generator: Generator<T, K>;

  /**
   * Creates an instance of `ErrorBoundary`.
   * @constructor
   * @param {Generator.<T,K>} [generator] - generator
   */
  public constructor(generator: Generator<T, K>) {
    super();
    this.generator = generator;
  }

  /**
   * Invokes the give generator and handles the possible errors.
   * @param {T=} [input] - input
   * @returns {K|undefined}
   */
  public process(input?: T): K | undefined {
    try {
      return this.generator.process(input);
    } catch {
      return undefined;
    }
  }
}
