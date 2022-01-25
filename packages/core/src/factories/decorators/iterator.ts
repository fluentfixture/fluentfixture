import { IFactory } from '../interfaces/factory';
import { Assert } from '../../utils/assert';
import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from '../../constants/limits';
import { Decorator } from './decorator';

/**
 * The `Iterator` decorator is a utility decorator that iterates the underlying factory.
 * It takes a factory and a count. The count parameter is an integer.
 * It is useful for creating arrays from factories.
 * The `Iterator` decorator does not store a state and does not alter the result of the given factory.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/decorators|Decorators}
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/decorators/iterator|Docs}
 * @class
 * @template T
 * @extends Decorator.<T,T[]>
 */
export class Iterator<T = any> extends Decorator<T, ReadonlyArray<T>> {
  private readonly count: number;

  /**
   * Creates an instance of `Iterator`.
   * @constructor
   * @param {IFactory.<T>} [factory] - the factory to be decorated
   * @param {number} [count] - the length of the array
   */
  public constructor(factory: IFactory<T>, count: number) {
    Assert.isInteger('Iterator.constructor(factory, count)', 'count', count);
    Assert.isInRange('Iterator.constructor(factory, count)', 'count', count, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE);
    super(factory);
    this.count = count;
  }

  /**
   * Generates a data by using the decorated `Factory`.
   * @see IFactory
   * @returns {T[]}
   */
  public single(): ReadonlyArray<T> {
    return this.factory.many(this.count);
  }

  /**
   * Returns the length of the array.
   * @returns {number}
   */
  public getCount(): number {
    return this.count;
  }
}
