import { Pipe } from './pipe';

/**
 * `Flow` combines the given pipes and execute them sequentially.
 * @class
 */
export class Flow extends Pipe {
  private readonly pipes: ReadonlyArray<Pipe>;

  /**
   * Creates an instance of `Flow`.
   * @constructor
   * @param {Pipe[]} [pipes] - pipes
   */
  public constructor(pipes: ReadonlyArray<Pipe>) {
    super();
    this.pipes = pipes;
  }

  /**
   * Handles a value by executing the given pipes.
   * @public
   * @param {*} [input] - input
   * @returns {*}
   */
  public handle(input?: any): any {
    return this.pipes.reduce((prev, pipe) => pipe.handle(prev), input);
  }

  /**
   * Returns the given pipes.
   * @public
   * @returns {Pipe[]}
   */
  public getPipes(): ReadonlyArray<Pipe> {
    return this.pipes;
  }
}
