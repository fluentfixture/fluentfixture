import { ProducerFunction } from '../../types/producer-function';
import { Factory } from '../factory';
import { Assert } from '../../utils/assert';

export class FunctionAdapter<T> extends Factory<T> {
  private readonly producer: ProducerFunction<T>;

  public constructor(producer: ProducerFunction<T>) {
    Assert.func(producer);
    super();
    this.producer = producer;
  }

  public single(): T {
    return this.producer();
  }

  public getFunction(): ProducerFunction<T> {
    return this.producer;
  }
}
