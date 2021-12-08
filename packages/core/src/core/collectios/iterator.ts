import { AbstractFactory } from '../abstract-factory';
import { Factory } from '../factory';
import { Assert } from '../../utils/assert';
import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from '../../constants/limits';

export class Iterator<T = any> extends AbstractFactory<ReadonlyArray<T>> {
  private readonly count: number;
  private readonly factory: Factory<T>;

  public constructor(factory: Factory<T>, count: number) {
    Assert.factoryLike(factory);
    Assert.integer(count);
    Assert.inRange(count, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE);
    super();
    this.factory = factory;
    this.count = count;
  }

  public single(): ReadonlyArray<T> {
    return this.factory.many(this.count);
  }
}
