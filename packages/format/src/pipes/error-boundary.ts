import { Pipe } from './pipe';

/**
 * `ErrorBoundary` is a pipe decorator that handle errors if an error occurred while invoking the decorated pipe.
 * @class
 * @template T, K
 * @extends Pipe.<T,K|undefined>
 */
export class ErrorBoundary<T = any, K = any> extends Pipe<T, K | undefined> {
  private readonly pipe: Pipe<T, K>;

  /**
   * Creates an instance of `ErrorBoundary`.
   * @constructor
   * @param {Pipe.<T,K>} [pipe] - pipe
   */
  public constructor(pipe: Pipe<T, K>) {
    super();
    this.pipe = pipe;
  }

  /**
   * Invokes the given pipe and handles the possible errors.
   * @public
   * @param {T=} [input] - input
   * @returns {K|undefined}
   */
  public handle(input?: T): K | undefined {
    try {
      return this.pipe.handle(input);
    } catch {
      return undefined;
    }
  }

  /**
   * Returns the given pipe.
   * @public
   * @returns {Pipe<T, K>}
   */
  public getPipe(): Pipe<T, K> {
    return this.pipe;
  }
}
