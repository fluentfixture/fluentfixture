import { AbstractFactory } from '../abstract-factory';
import { Random } from '../engine/random';
import { Assert } from '../../utils/assert';
import { Factory } from '../factory';
import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from '../../constants/limits';

export class Sampler<T = any> extends AbstractFactory<ReadonlyArray<T>> {
  private readonly size: number;
  private readonly factory: Factory<ReadonlyArray<T>>;

  public constructor(factory: Factory<ReadonlyArray<T>>, size: number) {
    Assert.integer(size);
    Assert.inRange(size, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE);
    Assert.factoryLike(factory);
    super();
    this.size = size;
    this.factory = factory;
  }

  public single(): ReadonlyArray<T> {
    return Random.sample(this.factory.single(), this.size);
  }

  public getSize(): number {
    return this.size;
  }

  public getFactory(): Factory<ReadonlyArray<T>> {
    return this.factory;
  }
}
