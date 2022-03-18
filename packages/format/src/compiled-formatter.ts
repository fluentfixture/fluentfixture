import { Generator } from './generators/generator';

/**
 * `CompiledFormatter` is a pre-compiled formatter.
 * @class
 */
export class CompiledFormatter {
  private readonly generators: ReadonlyArray<Generator<any, string>>;

  /**
   * Creates an instance of `CompiledFormatter`.
   * @constructor
   * @param {Generator[]} [generators] - generator list
   */
  public constructor(generators: ReadonlyArray<Generator<any, string>>) {
    this.generators = generators;
  }

  /**
   * Process the result by using the given source.
   * @public
   * @param {*} [source] - source
   * @returns {string}
   */
  public format(source: any): string {
    return this.generators.reduce((prev, generator) => prev + generator.process(source), '');
  }
}
