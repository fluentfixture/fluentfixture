import { Pipe } from './pipes/pipe';

/**
 * `CompiledFormatter` is a pre-compiled formatter.
 * @class
 */
export class CompiledFormatter {
  private readonly pipes: ReadonlyArray<Pipe<any, string>>;

  /**
   * Creates an instance of `CompiledFormatter`.
   * @constructor
   * @param {Pipe[]} [pipes] - pipes
   */
  public constructor(pipes: ReadonlyArray<Pipe<any, string>>) {
    this.pipes = pipes;
  }

  /**
   * Formats the input by using the given pipes.
   * @public
   * @param {*} [source] - source
   * @returns {string}
   */
  public format(source: any): string {
    return this.pipes.reduce((prev, pipe) => prev + pipe.handle(source), '');
  }
}
