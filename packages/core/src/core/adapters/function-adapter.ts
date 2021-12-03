import { ProducerFunction } from '../types/producer-function';
import { AbstractFactory } from '../abstract-factory';
import { Assert } from '../../utils/assert';

export class FunctionAdapter<OUT> extends AbstractFactory<OUT> {
  private readonly producer: ProducerFunction<OUT>;

  public constructor(producer: ProducerFunction<OUT>) {
    Assert.func(producer);
    super();
    this.producer = producer;
  }

  public single(): OUT {
    return this.producer();
  }
}
