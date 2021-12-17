import { IFactory } from '../interfaces/factory';
import { Assert } from '../../utils/assert';
import { ConsumerFunction } from '../../types/consumer-function';
import { Converter } from './converter';

export class Exporter<T = any> extends Converter<T, T> {
  private readonly consumer: ConsumerFunction<T>;

  public constructor(factory: IFactory<T>, consumer: ConsumerFunction<T>) {
    Assert.func(consumer);
    super(factory);
    this.consumer = consumer;
  }

  public single(): T {
    const value = this.factory.single();
    this.consumer(value);
    return value;
  }

  public getConsumer(): ConsumerFunction<T> {
    return this.consumer;
  }
}
