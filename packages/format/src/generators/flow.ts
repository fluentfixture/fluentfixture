import { Generator } from './generator';

/**
 * `Flow` combines the given generators and execute them sequentially.
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
   * Generates a value by executing the flow created by using the given generators.
   * @public
   * @param {*} [input] - input
   * @returns {*}
   */
  public process(input?: any): any {
    return this.generators.reduce((prev, generator) => generator.process(prev), input);
  }

  /**
   * Returns the given generators.
   * @public
   * @returns {Generator[]}
   */
  public getGenerators(): ReadonlyArray<Generator> {
    return this.generators;
  }
}
