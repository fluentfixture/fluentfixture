import { IFactory } from '../factories/interfaces/factory';
import { Assert } from '../utils/assert';
import { Factory } from '../factories/factory';
import { DEFAULT_ARRAY_SIZE, DEFAULT_PERCENTAGE } from '../constants/limits';
import { ConvertFunction } from '../types/convert-function';
import { Functional } from '../factories/converters/functional';
import { ConsumerFunction } from '../types/consumer-function';
import { Exporter } from '../factories/converters/exporter';
import { Optional } from '../factories/selectors/optional';
import { Nullable } from '../factories/selectors/nullable';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { ProducerFunction } from '../types/producer-function';
import { FunctionAdapter } from '../factories/adapters/function-adapter';
import { Formatter } from '../factories/converters/formatter';
import { Memo } from '../factories/converters/memo';
import { ArrayStream, StringStream } from './stream-loader';

export class Stream<T = any> extends Factory<T> {
  private readonly factory: IFactory<T>;

  public constructor(factory: IFactory<T>) {
    Assert.factoryLike(factory);
    super();
    this.factory = factory;
  }

  public single(): T {
    return this.factory.single();
  }

  public static from<T = any>(factory: IFactory<T>): Stream<T> {
    return new Stream(factory);
  }

  public static fromValue<T = any>(value: T): Stream<T> {
    return Stream.from(new ValueAdapter(value));
  }

  public static fromResult<T = any>(value: ProducerFunction<T>): Stream<T> {
    return Stream.from(new FunctionAdapter(value));
  }

  public array(count: number = DEFAULT_ARRAY_SIZE): ArrayStream<T> {
    return ArrayStream.iterate(this, count);
  }

  public format(template: string): StringStream {
    return new StringStream(new Formatter(this, template));
  }

  public convert<K>(fn: ConvertFunction<T, K>): Stream<K> {
    return Stream.from(new Functional(this, fn));
  }

  public memo(): this {
    return new (this.constructor as (new (factory: IFactory<T>) => any))(new Memo(this));
  }

  public dump(fn: ConsumerFunction<T>): this {
    return new (this.constructor as (new (factory: IFactory<T>) => any))(new Exporter(this, fn));
  }

  public optional(percentage: number = DEFAULT_PERCENTAGE): Stream<T | undefined> {
    return Stream.from(new Optional(this, percentage));
  }

  public nullable(percentage: number = DEFAULT_PERCENTAGE): Stream<T | null> {
    return Stream.from(new Nullable(this, percentage));
  }

  public getFactory(): IFactory<T> {
    return this.factory;
  }
}
