import { AbstractFactory } from '../abstract-factory';
import { Random } from '../engine/random';
import { Assert } from '../../utils/assert';
import { Factory } from '../factory';

export class Picker<T = any> extends AbstractFactory<T> {
  private readonly factory: Factory<ReadonlyArray<T>>

  public constructor(factory: Factory<ReadonlyArray<T>>) {
    Assert.factoryLike(factory);
    super();
    this.factory = factory;
  }

  public single(): T {
    return Random.pick(this.factory.single());
  }

  public getFactory(): Factory<ReadonlyArray<T>> {
    return this.factory;
  }
}
