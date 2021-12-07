import { ProducerFunction } from '../types/producer-function';
import { AbstractFactory } from '../abstract-factory';
import { Assert } from '../../utils/assert';

export class FunctionAdapter<T> extends AbstractFactory<T> {
  private readonly producer: ProducerFunction<T>;

  public constructor(producer: ProducerFunction<T>) {
    Assert.func(producer);
    super();
    this.producer = producer;
  }

  public single(): T {
    return this.producer();
  }
}
