import { Assert } from '../../assertions/assert';
import { ConsumerFunction } from '../../types/consumer-function';
import { Factory } from '../factory';
import { Decorator } from './decorator';

export class Exporter<T = any> extends Decorator<T, T> {
  private readonly fn: ConsumerFunction<T>;

  public constructor(factory: Factory<T>, fn: ConsumerFunction<T>) {
    Assert.isFunction('Exporter.constructor(factory, fn)', 'fn', fn);
    super(factory);
    this.fn = fn;
  }

  public single(): T {
    const value = this.factory.single();
    this.fn(value);
    return value;
  }

  public getFunction(): ConsumerFunction<T> {
    return this.fn;
  }
}
