import { ProducerFunction } from '../../types/producer-function';
import { Factory } from '../factory';
import { Assert } from '../../assertions/assert';

export class FunctionAdapter<T> extends Factory<T> {
  private readonly fn: ProducerFunction<T>;

  public constructor(fn: ProducerFunction<T>) {
    Assert.isFunction('FunctionAdapter.constructor(fn)', 'fn', fn);
    super();
    this.fn = fn;
  }

  public single(): T {
    return this.fn();
  }

  public getFunction(): ProducerFunction<T> {
    return this.fn;
  }
}
