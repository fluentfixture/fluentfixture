import * as path from 'object-path';
import { Generator } from './generator';

/**
 * `Extractor` extracts data from the given source with the given path.
 * @class
 * @template T
 * @extends Generator.<object,T>
 */
export class Extractor<T = any> extends Generator<object, T> {
  private readonly path: string;

  /**
   * Creates an instance of `Extractor`.
   * @constructor
   * @param {string} [path] - path
   */
  public constructor(path: string) {
    super();
    this.path = path;
  }

  /**
   * Extracts data from the given source with the given path.
   * @public
   * @param {object} [input] - input
   * @returns {T}
   */
  public process(input: object): T {
    return path.get(input, this.path);
  }
}
