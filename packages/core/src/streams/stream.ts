import { IFactory } from '../factories/interfaces/factory';
import { Assert } from '../utils/assert';
import { Factory } from '../factories/factory';
import { DEFAULT_ARRAY_SIZE, DEFAULT_PERCENTAGE } from '../constants/limits';
import { ConvertFunction } from '../types/convert-function';
import { Functional } from '../factories/decorators/functional';
import { ConsumerFunction } from '../types/consumer-function';
import { Exporter } from '../factories/decorators/exporter';
import { Optional } from '../factories/selectors/optional';
import { Nullable } from '../factories/selectors/nullable';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { ProducerFunction } from '../types/producer-function';
import { FunctionAdapter } from '../factories/adapters/function-adapter';
import { Formatter } from '../factories/decorators/formatter';
import { Memo } from '../factories/decorators/memo';
import { ArrayStream, StringStream } from './stream-loader';

/**
 * `Stream` is the superclass of all stream types.
 * `Stream` is a factory wrapper (streams are also factories) that provides a fluent interface by decorating factories.
 * All methods of streams create other streams that wrap themselves.
 * Like any factory, streams are also immutable and reusable.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/stream|Docs}
 * @class
 * @template T
 */
export class Stream<T = any> extends Factory<T> {
  private readonly factory: IFactory<T>;

  /**
   * Creates an instance of `Stream.<T>`.
   * @constructor
   * @param {IFactory.<T>} [factory] - the factory to be decorated
   */
  public constructor(factory: IFactory<T>) {
    Assert.isFactoryLike('Stream.constructor(factory)', 'factory', factory);
    super();
    this.factory = factory;
  }

  /**
   * Creates an instance of `Stream.<T>`
   * @static
   * @param {IFactory.<T>} [factory] - the factory to be decorated
   * @return {Stream.<T>}
   */
  public static from<T = any>(factory: IFactory<T>): Stream<T> {
    return new Stream(factory);
  }

  /**
   * Creates a `Stream.<T>` that generates always the given value.
   * @static
   * @param {T} [value] - the value to be generated
   * @returns {Stream.<T>}
   */
  public static fromValue<T = any>(value: T): Stream<T> {
    return Stream.from(new ValueAdapter(value));
  }

  /**
   * Creates a `Stream.<T>` that generates always the result of the given function.
   * @static
   * @param {function():T} [fn] - the function to be invoked for generating data
   * @returns {Stream.<T>}
   */
  public static fromResult<T = any>(fn: ProducerFunction<T>): Stream<T> {
    return Stream.from(new FunctionAdapter(fn));
  }

  /**
   * Generates a data by using the decorated `Factory`.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/stream#single|Docs}
   * @see IFactory
   * @returns {T}
   */
  public single(): T {
    return this.factory.single();
  }

  /**
   * Creates an `ArrayStream` with an `Iterator` decorator.
   * The underlying type of the new stream is a read-only array.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/stream#array-length|Docs}
   * @see ArrayStream
   * @see Iterator
   * @param {number} [length=10] - the length of the array
   * @returns {ArrayStream.<T>}
   */
  public array(length: number = DEFAULT_ARRAY_SIZE): ArrayStream<T> {
    return ArrayStream.iterate(this, length);
  }

  /**
   * Creates a `StringStream` with a `Formatter` decorator and the given template.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/stream#format-template|Docs}
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/fundamentals/templates|Templates}
   * @see StringStream
   * @see Formatter
   * @param {string} [template] - the template expression
   * @returns {StringStream}
   */
  public format(template: string): StringStream {
    return new StringStream(new Formatter(this, template));
  }

  /**
   * Creates a `Stream` with a `Functional` decorator.
   * The underlying type of the new stream is the same as the return type of the given function.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/stream#convert-fn|Docs}
   * @see Functional
   * @template T, K
   * @param {function(T):K} [fn] - the converter function
   * @returns {Stream.<K>}
   */
  public convert<K>(fn: ConvertFunction<T, K>): Stream<K> {
    return Stream.from(new Functional(this, fn));
  }

  /**
   * Creates the same sub-type of the `Stream` with a `Functional` decorator.
   * The underlying type of the new stream is the same as the return type of the given function.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/stream#apply-fn|Docs}
   * @see Functional
   * @param {function(T):T} [fn] - the converter function
   * @returns {Stream.<T>}
   */
  public apply(fn: ConvertFunction<T, T>): this {
    return new (this.constructor as (new (factory: IFactory<T>) => any))(new Functional(this, fn));
  }

  /**
   * Creates a `Stream` with a `Memo` decorator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/stream#memo|Docs}
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/fundamentals/optimization|Optimization}
   * @see Memo
   * @returns {Stream.<T>}
   */
  public memo(): this {
    return new (this.constructor as (new (factory: IFactory<T>) => any))(new Memo(this));
  }

  /**
   * Creates a `Stream` with an `Exporter` decorator and the given function.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/stream#dump-fn|Docs}
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/fundamentals/debugging|Debugging}
   * @see Exporter
   * @param {function(T):void} [fn] - the function that receives the latest version of mock data
   * @returns {Stream.<T>}
   */
  public dump(fn: ConsumerFunction<T>): this {
    return new (this.constructor as (new (factory: IFactory<T>) => any))(new Exporter(this, fn));
  }

  /**
   * Creates a `Stream` with an `Optional` decorator, which means It may generate a value or be undefined.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/stream#optional-percentage|Docs}
   * @see Optional
   * @param {number} [percentage=0.5] - a number within [0, 1] of how often the result should be defined
   * @returns {Stream.<T | undefined>}
   */
  public optional(percentage: number = DEFAULT_PERCENTAGE): Stream<T | undefined> {
    return Stream.from(new Optional(this, percentage));
  }

  /**
   * Creates a `Stream` with an `Nullable` decorator, which means It may generate a value or be null.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/stream#nullable-percentage|Docs}
   * @see Nullable
   * @param {number} [percentage=0.5] - a number within [0, 1] of how often the result should be defined
   * @returns {Stream.<T | null>}
   */
  public nullable(percentage: number = DEFAULT_PERCENTAGE): Stream<T | null> {
    return Stream.from(new Nullable(this, percentage));
  }

  /**
   * Returns the decorated `Factory`.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/stream#getfactory|Docs}
   * @see IFactory
   * @returns {IFactory.<T>}
   */
  public getFactory(): IFactory<T> {
    return this.factory;
  }
}
