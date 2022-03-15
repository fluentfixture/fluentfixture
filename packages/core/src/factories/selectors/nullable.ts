import { ValueAdapter } from '../adapters/value-adapter';
import { Factory } from '../factory';
import { Selector } from './selector';

/**
 * `Nullable` decorator decorates a factory with the given percentage.
 * When the `single()` method is invoked, it generates data using the selected factory or returns `null` using the given percentage.
 * @class
 * @template T
 * @extends Selector.<T,null>
 */
export class Nullable<T = any> extends Selector<T, null> {

  /**
   * Creates an instance of `Nullable`.
   * @constructor
   * @param {Factory.<T>} [factory] - the factory to be decorated
   * @param {number} [percentage] - a number within [0, 1] of how often the result should be true
   */
  public constructor(factory: Factory<T>, percentage: number) {
    super(factory, new ValueAdapter(null), percentage);
  }
}
