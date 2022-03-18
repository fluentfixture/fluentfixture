import { TypeUtils } from '@fluentfixture/shared';
import { Generator } from '../generator';

/**
 * `GeneratorFactory` stores and returns generators by the given name.
 * @class
 */
export class GeneratorFactory {
  private readonly generators: Map<string, Generator>;

  /**
   * Creates an instance of `GeneratorFactory`.
   * @constructor
   */
  public constructor() {
    this.generators = new Map<string, Generator>();
  }

  /**
   * Registers a generator with the given name.
   * @public
   * @param {string} [name] - generator name
   * @param {Generator} [generator] - generator instance
   */
  public set(name: string, generator: Generator): void {
    if (!TypeUtils.isNonBlankString(name)) {
      throw new Error('Generator name must be a non-blank string!');
    }
    if (!TypeUtils.isObject(generator)) {
      throw new Error('Generator must be an object!');
    }
    const generatorName = name.trim();
    if (this.generators.has(generatorName)) {
      throw new Error(`Generator with name "${generatorName}" already registered!`);
    }
    this.generators.set(generatorName, generator);
  }

  /**
   * Returns a generator with the given name.
   * @public
   * @param {string} [name] - generator name
   * @returns {Generator}
   */
  public get(name: string): Generator {
    if (!TypeUtils.isNonBlankString(name)) {
      throw new Error('Generator name must be a non-blank string!');
    }
    const generatorName = name.trim();
    if (!this.generators.has(generatorName)) {
      throw new Error(`Generator with name "${generatorName}" could not be found!`);
    }
    return this.generators.get(generatorName);
  }
}
