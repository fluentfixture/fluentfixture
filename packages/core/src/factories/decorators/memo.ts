import { ProducerFunction } from '../../types/producer-function';
import { memo } from '../../utils/memo';
import { Factory } from '../factory';
import { Decorator } from './decorator';

/**
 * `Memo` decorator decorates a factory with the memoization function.
 * When the `single()` method is invoked, it generates data and stores it in the memoization function; after that, always return the stored result.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/factories/decorators|Decorators}
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/factories/decorators/memo|Docs}
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/fundamentals/optimization|Optimization}
 * @see {@link https://en.wikipedia.org/wiki/Memoization|Memoization}
 * @class
 * @template T
 * @extends Decorator.<T,T>
 */
export class Memo<T = any> extends Decorator<T, T> {
  private readonly memoized: ProducerFunction<T>;

  /**
   * Creates an instance of `Memo`.
   * @constructor
   * @param {Factory.<T>} [factory] - the factory to be decorated
   */
  public constructor(factory: Factory<T>) {
    super(factory);
    this.memoized = memo(factory);
  }

  /**
   * Generates a data by using the decorated factory.
   * @see Factory
   * @public
   * @returns {T}
   */
  public single(): T {
    return this.memoized();
  }
}
