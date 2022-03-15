import { DEFAULT_PERCENTAGE } from '../constants/limits';
import { BooleanFactory } from '../factories/boolean-factory';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { Factory } from '../factories/factory';
import { Stream } from './stream-loader';

/**
 * `BooleanStream` extends the `Stream.<boolean>` class for boolean operations.
 * @see Stream
 * @class
 * @extends Stream.<boolean>
 */
export class BooleanStream extends Stream<boolean> {

  /**
   * Creates an instance of `BooleanStream`.
   * @constructor
   * @param {Factory.<boolean>} [factory] - the factory to be decorated
   */
  public constructor(factory: Factory<boolean>) {
    super(factory);
  }

  /**
   * Creates a `BooleanStream` with `ValueAdapter` adapter and `true`, which means it always generates `true`.
   * @see ValueAdapter
   * @static
   * @public
   * @returns {BooleanStream}
   */
  public static truthy(): BooleanStream {
    return new BooleanStream(new ValueAdapter(true));
  }

  /**
   * Creates a `BooleanStream` with `ValueAdapter` adapter and `false`, which means it always generates `false`.
   * @see ValueAdapter
   * @static
   * @public
   * @returns {BooleanStream}
   */
  public static falsy(): BooleanStream {
    return new BooleanStream(new ValueAdapter(false));
  }

  /**
   * Creates a `BooleanStream` with `BooleanFactory` with the given percentage.
   * @see BooleanFactory
   * @static
   * @public
   * @param {number} [percentage=0.5] - a number within [0, 1] of how often the result should be true
   * @returns {BooleanStream}
   */
  public static fromPercentage(percentage: number= DEFAULT_PERCENTAGE): BooleanStream {
    return new BooleanStream(new BooleanFactory(percentage));
  }

  /**
   * Creates a `BooleanStream` with `Functional` decorator and the `not` operator.
   * @see Functional
   * @public
   * @returns {BooleanStream}
   */
  public not(): BooleanStream {
    return this.apply((i) => !i);
  }
}
