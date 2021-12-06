import { AbstractFactory } from '../abstract-factory';
import { Factory } from '../factory';
import { Assert } from '../../utils/assert';
import { ConsumerFunction } from '../types/consumer-function';

export class Exporter<OUT = any> extends AbstractFactory<OUT> {
  private readonly factory: Factory<OUT>;
  private readonly consumer: ConsumerFunction<OUT>;

  public constructor(factory: Factory<OUT>, consumer: ConsumerFunction<OUT>){
    Assert.factoryLike(factory);
    Assert.func(consumer);
    super();
    this.factory = factory;
    this.consumer = consumer;
  }

  public single(): OUT {
    const value = this.factory.single();
    this.consumer(value);
    return value;
  }
}
