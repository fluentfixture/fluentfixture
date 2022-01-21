import { IFactory } from '../factories/interfaces/factory';
import { DEFAULT_PERCENTAGE } from '../constants/limits';
import { BooleanFactory } from '../factories/boolean-factory';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { Stream } from './stream-loader';

/**
 * `BooleanStream` extends the `Stream.<boolean>` class for boolean operations.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/boolean-stream|Docs}
 * @see Stream
 * @class
 * @extends Stream.<boolean>
 */
export class BooleanStream extends Stream<boolean> {

  /**
   * Creates an instance of `BooleanStream`.
   * @constructor
   * @param {IFactory.<boolean>} [factory] - the factory to be decorated
   */
  public constructor(factory: IFactory<boolean>) {
    super(factory);
  }

  /**
   * Creates a `BooleanStream` that generates always true.
   * @static
   * @returns {BooleanStream}
   */
  public static truthy(): BooleanStream {
    return new BooleanStream(new ValueAdapter(true));
  }

  /**
   * Creates a `BooleanStream` that generates always false.
   * @static
   * @returns {BooleanStream}
   */
  public static falsy(): BooleanStream {
    return new BooleanStream(new ValueAdapter(false));
  }

  /**
   * Creates a `BooleanStream` that generates a boolean with the given percentage.
   * @static
   * @param {number} [percentage=0.5] - a number within [0, 1] of how often the result should be true
   * @returns {BooleanStream}
   */
  public static fromPercentage(percentage: number= DEFAULT_PERCENTAGE): BooleanStream {
    return new BooleanStream(new BooleanFactory(percentage));
  }

  /**
   * Creates a `BooleanStream` with a `Functional` decorator and the not operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/boolean-stream#not|Docs}
   * @see Functional
   * @returns {BooleanStream}
   */
  public not(): BooleanStream {
    return this.apply((i) => !i);
  }
}
