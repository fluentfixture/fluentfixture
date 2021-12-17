import { IFactory } from '../core/interfaces/factory';
import { Assert } from '../utils/assert';
import { Factory } from '../core/factory';

export class Stream<T = any> extends Factory<T> {
  private readonly factory: IFactory<T>;

  public constructor(factory: IFactory<T>) {
    Assert.factoryLike(factory);
    super();
    this.factory = factory;
  }

  public single(): T {
    return this.factory.single();
  }

  public getFactory(): IFactory<T> {
    return this.factory;
  }
}
