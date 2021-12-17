import { IFactory } from '../factories/interfaces/factory';
import { Assert } from '../utils/assert';
import { Factory } from '../factories/factory';

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
