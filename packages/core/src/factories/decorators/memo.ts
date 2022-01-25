import { IFactory } from '../interfaces/factory';
import { ProducerFunction } from '../../types/producer-function';
import { memo } from '../../utils/memo';
import { Decorator } from './decorator';

/**
 * The `Memo` decorator is a utility decorator that invokes the underlying factory only once.
 * It is useful for optimization. More about this decorator is covered in the Optimization section.
 * The `Memo` decorator does store a state and does not alter the result of the given factory.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/decorators|Decorators}
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/decorators/memo|Docs}
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/fundamentals/optimization|Optimization}
 * @class
 * @template T
 * @extends Decorator.<T,T>
 */
export class Memo<T = any> extends Decorator<T, T> {
  private readonly memoized: ProducerFunction<T>;

  /**
   * Creates an instance of `Memo`.
   * @constructor
   * @param {IFactory.<T>} [factory] - the factory to be decorated
   */
  public constructor(factory: IFactory<T>) {
    super(factory);
    this.memoized = memo(factory);
  }

  /**
   * Generates a data by using the decorated `Factory`.
   * @see IFactory
   * @returns {T}
   */
  public single(): T {
    return this.memoized();
  }
}
