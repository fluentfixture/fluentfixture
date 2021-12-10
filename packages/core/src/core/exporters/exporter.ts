import { AbstractFactory } from '../abstract-factory';
import { Factory } from '../factory';
import { Assert } from '../../utils/assert';
import { ConsumerFunction } from '../types/consumer-function';

export class Exporter<T = any> extends AbstractFactory<T> {
  private readonly factory: Factory<T>;
  private readonly consumer: ConsumerFunction<T>;

  public constructor(factory: Factory<T>, consumer: ConsumerFunction<T>) {
    Assert.factoryLike(factory);
    Assert.func(consumer);
    super();
    this.factory = factory;
    this.consumer = consumer;
  }

  public single(): T {
    const value = this.factory.single();
    this.consumer(value);
    return value;
  }

  public getFactory(): Factory<T> {
    return this.factory;
  }

  public getConsumer(): ConsumerFunction<T> {
    return this.consumer;
  }
}
