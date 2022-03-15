import { Factory } from '../factory';
import { Random } from '../../engine/random';
import { Decorator } from './decorator';

/**
 * `Picker` decorator decorates an array factory.
 * When the `single()` method is invoked, it generates data using the decorated factory and picks one of them.
 * @class
 * @template T
 * @extends Decorator.<T[],T>
 */
export class Picker<T = any> extends Decorator<ReadonlyArray<T>, T> {

  /**
   * Creates an instance of `Picker`.
   * @constructor
   * @param {Factory.<T[]>} [factory] - the factory to be decorated
   */
  public constructor(factory: Factory<ReadonlyArray<T>>) {
    super(factory);
  }

  /**
   * Generates single data by using the decorated factory.
   * @see Factory
   * @returns {T}
   */
  public single(): T {
    return Random.pick(this.factory.single());
  }
}
