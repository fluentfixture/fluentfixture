import { Factory } from '../factory';
import { IFactory } from '../interfaces/factory';
import { Assert } from '../../utils/assert';

export abstract class Decorator<T = any, K = any> extends Factory<K> {
  protected readonly factory: IFactory<T>;

  protected constructor(factory: IFactory<T>) {
    Assert.isFactoryLike('Decorator.constructor(factory)', 'factory', factory);
    super();
    this.factory = factory;
  }

  public getFactory(): IFactory<T> {
    return this.factory;
  }
}
