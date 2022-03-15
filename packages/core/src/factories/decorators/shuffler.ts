import { Factory } from '../factory';
import { Random } from '../../engine/random';
import { Decorator } from './decorator';

/**
 * `Shuffler` decorator decorates an array factory.
 * When the `single()` method is invoked, it generates data using the decorated factory and shuffles it.
 * @class
 * @template T
 * @extends Decorator.<T[],T[]>
 */
export class Shuffler<T = any> extends Decorator<ReadonlyArray<T>, ReadonlyArray<T>> {

  /**
   * Creates an instance of `Shuffler`.
   * @constructor
   * @param {Factory.<T[]>} [factory] - the factory to be decorated
   */
  public constructor(factory: Factory<ReadonlyArray<T>>) {
    super(factory);
  }

  /**
   * Generates array of data by using the decorated factory.
   * @see Factory
   * @returns {T[]}
   */
  public single(): ReadonlyArray<T> {
    return Random.shuffle(this.factory.single());
  }
}
