import { AbstractFactory } from '../abstract-factory';
import { Factory } from '../factory';
import { Assert } from '../../utils/assert';
import { Random } from '../engine/random';

export class Shuffler<T = any> extends AbstractFactory<ReadonlyArray<T>> {
  private readonly factory: Factory<ReadonlyArray<T>>;

  public constructor(factory: Factory<ReadonlyArray<T>>) {
    Assert.factoryLike(factory);
    super();
    this.factory = factory;
  }

  public single(): ReadonlyArray<T> {
    return Random.shuffle(this.factory.single());
  }

  public getFactory(): Factory<ReadonlyArray<T>> {
    return this.factory;
  }
}
