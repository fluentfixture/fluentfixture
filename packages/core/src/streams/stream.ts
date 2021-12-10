import { Factory } from '../core/factory';
import { Assert } from '../utils/assert';
import { AbstractFactory } from '../core/abstract-factory';

export class Stream<T = any> extends AbstractFactory<T> {
  private readonly factory: Factory<T>;

  public constructor(factory: Factory<T>) {
    Assert.factoryLike(factory);
    super();
    this.factory = factory;
  }

  public single(): T {
    return this.factory.single();
  }

  public getFactory(): Factory<T> {
    return this.factory;
  }
}
