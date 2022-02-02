import { Factory } from '../factory';
import { Random } from '../../engine/random';
import { Assert } from '../../utils/assert';
import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from '../../constants/limits';
import { Decorator } from './decorator';

/**
 * `Sampler` decorator decorates an array factory with the give count.
 * When the `single()` method is invoked, it generates data using the decorated factory and takes a sample from it.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/decorators|Decorators}
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/decorators/sampler|Docs}
 * @class
 * @template T
 * @extends Decorator.<T[],T[]>
 */
export class Sampler<T = any> extends Decorator<ReadonlyArray<T>, ReadonlyArray<T>> {
  private readonly size: number;

  /**
   * Creates an instance of `Sampler`.
   * @constructor
   * @param {Factory.<T[]>} [factory] - the factory to be decorated
   * @param {number} [size] - the sample size
   */
  public constructor(factory: Factory<ReadonlyArray<T>>, size: number) {
    Assert.isInteger('Sampler.constructor(factory, size)', 'size', size);
    Assert.isInRange('Sampler.constructor(factory, size)', 'size', size, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE);
    super(factory);
    this.size = size;
  }

  /**
   * Generates array of data by using the decorated factory and the given size.
   * @see Factory
   * @returns {T[]}
   */
  public single(): ReadonlyArray<T> {
    return Random.sample(this.factory.single(), this.size);
  }

  /**
   * Returns the sample size.
   * @public
   * @returns {number}
   */
  public getSize(): number {
    return this.size;
  }
}
