import { IFactory } from '../factories/interfaces/factory';
import { NumberFactory } from '../factories/number-factory';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { Stream } from './stream-loader';

/**
 * `NumberStream` extends the `Stream.<number>` class for numeric operations.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/number-stream|Docs}
 * @see Stream
 * @class
 * @extends Stream.<number>
 */
export class NumberStream extends Stream<number> {

  /**
   * Creates an instance of `NumberStream`.
   * @constructor
   * @param {IFactory.<number>} [factory] - the factory to be decorated
   */
  public constructor(factory: IFactory<number>) {
    super(factory);
  }

  /**
   * Creates a `NumberStream` that generates a float number with the given boundaries.
   * @static
   * @param {number} [min=0] - the minimum of the boundary
   * @param {number} [max=1000] - the maximum of the boundary
   * @returns {NumberStream}
   */
  public static between(min: number, max: number): NumberStream {
    return new NumberStream(new NumberFactory(min, max));
  }

  /**
   * Creates a `NumberStream` that generates always the given number.
   * @static
   * @param {number} [num] - the number to be generated
   * @returns {NumberStream}
   */
  public static constant(num: number): NumberStream {
    return new NumberStream(new ValueAdapter(num));
  }

  /**
   * Creates a `NumberStream` with a `Functional` decorator and the mode operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/number-stream#mode-num|Docs}
   * @see Functional
   * @param {number} [num] - the number to be divisor
   * @returns {NumberStream}
   */
  public mode(num: number): NumberStream {
    return this.apply((i) => i % num);
  }

  /**
   * Creates a `NumberStream` with a `Functional` decorator and the add operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/number-stream#add-num|Docs}
   * @see Functional
   * @param {number} [num] - the number to be added
   * @returns {NumberStream}
   */
  public add(num: number): NumberStream {
    return this.apply((i) => i + num);
  }

  /**
   * Creates a `NumberStream` with a `Functional` decorator and the subtract operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/number-stream#subtract-num|Docs}
   * @see Functional
   * @param {number} [num] - the number to be subtracted
   * @returns {NumberStream}
   */
  public subtract(num: number): NumberStream {
    return this.apply((i) => i - num);
  }

  /**
   * Creates a `NumberStream` with a `Functional` decorator and the multiply operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/number-stream#multiply-num|Docs}
   * @see Functional
   * @param {number} [num] - the number to be multiplied
   * @returns {NumberStream}
   */
  public multiply(num: number): NumberStream {
    return this.apply((i) => i * num);
  }

  /**
   * Creates a `NumberStream` with a `Functional` decorator and the divide operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/number-stream#divide-num|Docs}
   * @see Functional
   * @param {number} [num] - the number to be divisor
   * @returns {NumberStream}
   */
  public divide(num: number): NumberStream {
    return this.apply((i) => i / num);
  }
}
