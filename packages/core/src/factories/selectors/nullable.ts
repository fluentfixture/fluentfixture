import { IFactory } from '../interfaces/factory';
import { ValueAdapter } from '../adapters/value-adapter';
import { Selector } from './selector';

/**
 * `Nullable` decorator decorates a factory with the given percentage.
 * When the `single()` method is invoked, it generates data using the selected factory or returns `null` using the given percentage.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/factories/decorators|Decorators}
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/factories/decorators/nullable|Docs}
 * @class
 * @template T
 * @extends Selector.<T,null>
 */
export class Nullable<T = any> extends Selector<T, null> {

  /**
   * Creates an instance of `Nullable`.
   * @constructor
   * @param {IFactory.<T>} [factory] - the factory to be decorated
   * @param {number} [percentage] - a number within [0, 1] of how often the result should be true
   */
  public constructor(factory: IFactory<T>, percentage: number) {
    super(factory, new ValueAdapter(null), percentage);
  }
}
