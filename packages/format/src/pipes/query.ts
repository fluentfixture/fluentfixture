import * as path from 'object-path';
import { Pipe } from './pipe';

/**
 * `Query` extracts data from the given input by using the given path query.
 * @class
 * @template T, K
 * @extends Pipe.<T,K>
 */
export class Query<T = any, K = any> extends Pipe<T, K> {
  private readonly query: string;

  /**
   * Creates an instance of `Query`.
   * @constructor
   * @param {string} [query] - path query
   */
  public constructor(query: string) {
    super();
    this.query = query;
  }

  /**
   * Extracts data from the given input by using the given path query.
   * @public
   * @param {T} [input] - input
   * @returns {K}
   */
  public handle(input: T): K {
    return path.get<K>(input as any, this.query, undefined);
  }

  /**
   * Returns the given path query.
   * @public
   * @returns {string}
   */
  public getQuery(): string {
    return this.query;
  }
}