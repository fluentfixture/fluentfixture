import { Generator } from '../generators/generator';

/**
 * `CompiledTemplate` pre-compiled template expression.
 * @class
 */
export class CompiledTemplate {
  private readonly generators: ReadonlyArray<Generator<any, string>>;

  /**
   * Creates an instance of `CompiledTemplate`.
   * @constructor
   * @param {Generator[]} [generators] - generator list
   */
  public constructor(generators: ReadonlyArray<Generator<any, string>>) {
    this.generators = generators;
  }

  /**
   * Evaluate the result by using the given source object.
   * @param {object} [source] - source object
   * @returns {string}
   */
  public format(source: object): string {
    return this.generators.reduce((prev, generator) => prev + generator.process(source), '');
  }
}
