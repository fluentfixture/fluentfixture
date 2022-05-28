import { Assert } from '../assertions/assert';
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

export class Stream<T = any> extends Factory<T> {
  private readonly factory: Factory<T>;

  public constructor(factory: Factory<T>) {
    Assert.isFactoryLike('Stream.constructor(factory)', 'factory', factory);
    super();
    this.factory = factory;
  }

  public static from<T = any>(factory: Factory<T>): Stream<T> {
    return new Stream(factory);
  }

  public static fromValue<T = any>(value: T): Stream<T> {
    return Stream.from(new ValueAdapter(value));
  }

  public static fromResult<T = any>(fn: ProducerFunction<T>): Stream<T> {
    return Stream.from(new FunctionAdapter(fn));
  }

  public single(): T {
    return this.factory.single();
  }

  public array(length: number = DEFAULT_ARRAY_SIZE): ArrayStream<T> {
    return ArrayStream.iterate(this, length);
  }

  public format(template: string): StringStream {
    return new StringStream(new Formatter(this, template));
  }

  public convert<K>(fn: ConvertFunction<T, K>): Stream<K> {
    return Stream.from(new Functional(this, fn));
  }

  public apply(fn: ConvertFunction<T, T>): this {
    return new (this.constructor as (new (factory: Factory<T>) => any))(new Functional(this, fn));
  }

  public memo(): this {
    return new (this.constructor as (new (factory: Factory<T>) => any))(new Memo(this));
  }

  public dump(fn: ConsumerFunction<T>): this {
    return new (this.constructor as (new (factory: Factory<T>) => any))(new Exporter(this, fn));
  }

  public optional(percentage: number = DEFAULT_PERCENTAGE): Stream<T | undefined> {
    return Stream.from(new Optional(this, percentage));
  }

  public nullable(percentage: number = DEFAULT_PERCENTAGE): Stream<T | null> {
    return Stream.from(new Nullable(this, percentage));
  }

  public getFactory(): Factory<T> {
    return this.factory;
  }
}
