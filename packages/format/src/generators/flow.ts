import { Generator } from './generator';

/**
 * `Flow` combines a set of generators and execute flow.
 * @class
 */
export class Flow extends Generator {
  private readonly generators: ReadonlyArray<Generator>;

  /**
   * Creates an instance of `Flow`.
   * @constructor
   * @param {Generator[]} [generators] - generator list
   */
  public constructor(generators: ReadonlyArray<Generator>) {
    super();
    this.generators = generators;
  }

  /**
   * Generates a value by using the generator list.
   * @public
   * @param {*} [input] - input
   * @returns {*}
   */
  public process(input?: any): any {
    return this.generators.reduce((prev, generator) => generator.process(prev), input);
  }
}
