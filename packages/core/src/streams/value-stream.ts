import { Factory } from '../core/factory';
import { Optional } from '../core/selectors/optional';
import { MapFunction } from '../core/types/map-function';
import { Exporter } from '../core/exporters/exporter';
import { ConsumerFunction } from '../core/types/consumer-function';
import { Nullable } from '../core/selectors/nullable';
import { ArrayStream } from './array-stream';
import { Stream } from './stream';
import { FactoryDecorator } from '../core/decorators/factory-decorator';
import { DEFAULT_ARRAY_SIZE, DEFAULT_PERCENTAGE } from '../constants/limits';

export class ValueStream<T = any> extends Stream<T> {
  public constructor(factory: Factory<T>) {
    super(factory);
  }

  public static from<T>(factory: Factory<T>): ValueStream<T> {
    return new ValueStream(factory);
  }

  public array(count: number = DEFAULT_ARRAY_SIZE): ArrayStream<T> {
    return ArrayStream.of(this, count);
  }

  public map<K>(fn: MapFunction<T, K>): ValueStream<K> {
    return ValueStream.from(new FactoryDecorator(this, fn));
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
