import { NumberFactory } from '../factories/number-factory';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { Factory } from '../factories/factory';
import { Stream } from './stream-loader';

/**
 * `NumberStream` extends the `Stream.<number>` class for numeric operations.
 * @see Stream
 * @class
 * @extends Stream.<number>
 */
export class NumberStream extends Stream<number> {

  /**
   * Creates an instance of `NumberStream`.
   * @constructor
   * @param {Factory.<number>} [factory] - the factory to be decorated
   */
  public constructor(factory: Factory<number>) {
    super(factory);
  }

  /**
   * Creates a `NumberStream` with `NumberFactory` and the given boundary.
   * @see NumberFactory
   * @static
   * @public
   * @param {number} [min=0] - the minimum of the boundary
   * @param {number} [max=1000] - the maximum of the boundary
   * @returns {NumberStream}
   */
  public static between(min: number, max: number): NumberStream {
    return new NumberStream(new NumberFactory(min, max));
  }

  /**
   * Creates a `NumberStream` with `ValueAdapter` adapter and the given number, which means it always generates the given number.
   * @see ValueAdapter
   * @static
   * @public
   * @param {number} [num] - the number to be generated
   * @returns {NumberStream}
   */
  public static constant(num: number): NumberStream {
    return new NumberStream(new ValueAdapter(num));
  }

  /**
   * Creates a `NumberStream` with `Functional` decorator and the `mode` operator.
   * @see Functional
   * @public
   * @param {number} [num] - the number to be divisor
   * @returns {NumberStream}
   */
  public mode(num: number): NumberStream {
    return this.apply((i) => i % num);
  }

  /**
   * Creates a `NumberStream` with `Functional` decorator and the `add` operator.
   * @see Functional
   * @public
   * @param {number} [num] - the number to be added
   * @returns {NumberStream}
   */
  public add(num: number): NumberStream {
    return this.apply((i) => i + num);
  }

  /**
   * Creates a `NumberStream` with `Functional` decorator and the `subtract` operator.
   * @see Functional
   * @public
   * @param {number} [num] - the number to be subtracted
   * @returns {NumberStream}
   */
  public subtract(num: number): NumberStream {
    return this.apply((i) => i - num);
  }

  /**
   * Creates a `NumberStream` with `Functional` decorator and the `multiply` operator.
   * @see Functional
   * @public
   * @param {number} [num] - the number to be multiplied
   * @returns {NumberStream}
   */
  public multiply(num: number): NumberStream {
    return this.apply((i) => i * num);
  }

  /**
   * Creates a `NumberStream` with `Functional` decorator and the `divide` operator.
   * @see Functional
   * @public
   * @param {number} [num] - the number to be divisor
   * @returns {NumberStream}
   */
  public divide(num: number): NumberStream {
    return this.apply((i) => i / num);
  }
}
