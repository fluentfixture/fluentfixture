import { IFactory } from '../factories/interfaces/factory';
import { Optional } from '../factories/selectors/optional';
import { ConvertFunction } from '../types/convert-function';
import { ConsumerFunction } from '../types/consumer-function';
import { Nullable } from '../factories/selectors/nullable';
import { DEFAULT_ARRAY_SIZE, DEFAULT_PERCENTAGE } from '../constants/limits';
import { Functional } from '../factories/converters/functional';
import { Exporter } from '../factories/converters/exporter';
import { Stream } from './stream';
import { ArrayStream } from './array-stream';

export class ValueStream<T = any> extends Stream<T> {
  public constructor(factory: IFactory<T>) {
    super(factory);
  }

  public static from<T>(factory: IFactory<T>): ValueStream<T> {
    return new ValueStream(factory);
  }

  public array(count: number = DEFAULT_ARRAY_SIZE): ArrayStream<T> {
    return ArrayStream.of(this, count);
  }

  public convert<K>(fn: ConvertFunction<T, K>): ValueStream<K> {
    return ValueStream.from(new Functional(this, fn));
  }

  public dump(fn: ConsumerFunction<T>): ValueStream<T> {
    return ValueStream.from(new Exporter(this, fn));
  }

  public optional(percentage: number = DEFAULT_PERCENTAGE): ValueStream<T | undefined> {
    return ValueStream.from(new Optional(this, percentage));
  }

  public nullable(percentage: number = DEFAULT_PERCENTAGE): ValueStream<T | null> {
    return ValueStream.from(new Nullable(this, percentage));
  }
}
