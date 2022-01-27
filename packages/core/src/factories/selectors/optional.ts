import { ValueAdapter } from '../adapters/value-adapter';
import { Factory } from '../factory';
import { Selector } from './selector';

/**
 * `Optional` decorator decorates a factory with the given percentage.
 * When the `single()` method is invoked, it generates data using the selected factory or returns `undefined` using the given percentage.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/factories/decorators|Decorators}
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/factories/decorators/optional|Docs}
 * @class
 * @template T
 * @extends Selector.<T,undefined>
 */
export class Optional<T = any> extends Selector<T, undefined> {

  /**
   * Creates an instance of `Optional`.
   * @constructor
   * @param {Factory.<T>} [factory] - the factory to be decorated
   * @param {number} [percentage] - a number within [0, 1] of how often the result should be true
   */
  public constructor(factory: Factory<T>, percentage: number) {
    super(factory, new ValueAdapter(undefined), percentage);
  }
}
