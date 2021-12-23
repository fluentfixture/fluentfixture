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
import { ArrayStream } from './stream-loader';

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

  public static from<T>(factory: IFactory<T>): Stream<T> {
    return new Stream(factory);
  }

  public array(count: number = DEFAULT_ARRAY_SIZE): ArrayStream<T> {
    return ArrayStream.of(this, count);
  }

  public convert<K>(fn: ConvertFunction<T, K>): Stream<K> {
    return Stream.from(new Functional(this, fn));
  }

  public dump(fn: ConsumerFunction<T>): Stream<T> {
    return Stream.from(new Exporter(this, fn));
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
