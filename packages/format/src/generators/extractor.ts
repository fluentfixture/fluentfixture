import * as path from 'object-path';
import { Generator } from './generator';

/**
 * `Extractor` extracts data from the given source with the given path.
 * @class
 * @template T
 * @extends Generator.<*,T>
 */
export class Extractor<T = any> extends Generator<any, T> {
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
   * @param {*} [input] - input
   * @returns {T}
   */
  public process(input: any): T {
    return path.get(input, this.path);
  }
}
