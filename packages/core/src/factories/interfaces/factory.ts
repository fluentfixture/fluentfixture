/**
 * @todo It is useless
 * @body we should use Factory class directly.
 */

/**
 * `IFactory` is base interface for all factory-like types.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/factories|Docs}
 * @interface
 * @template T
 */
export interface IFactory<T = any> {

  /**
   * Generates single mock data.
   * @returns {T}
   */
  single(): T;

  /**
   * Generates list of mock data.
   * @param {number} [count] the count of mock data to be generated
   * @returns {T[]}
   */
  many(count: number): ReadonlyArray<T>;
}
