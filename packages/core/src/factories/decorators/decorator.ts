import { Factory } from '../factory';
import { Assert } from '../../assertions/assert';

export abstract class Decorator<T = any, K = any> extends Factory<K> {
  protected readonly factory: Factory<T>;

  protected constructor(factory: Factory<T>) {
    Assert.isFactoryLike('Decorator.constructor(factory)', 'factory', factory);
    super();
    this.factory = factory;
  }

  public getFactory(): Factory<T> {
    return this.factory;
  }
}
