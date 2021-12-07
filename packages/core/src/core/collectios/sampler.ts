import { AbstractFactory } from '../abstract-factory';
import { Random } from '../engine/random';
import { Assert } from '../../utils/assert';

export class Sampler<T> extends AbstractFactory<ReadonlyArray<T>> {
  private readonly size: number;
  private readonly list: ReadonlyArray<T>;

  public constructor(list: ReadonlyArray<T>, size: number) {
    Assert.integer(size);
    Assert.nonEmptyArray(list);
    Assert.inRange(size, 0, list.length);
    super();
    this.list = list;
    this.size = size;
  }

  public single(): ReadonlyArray<T> {
    return Random.sample(this.list, this.size);
  }
}
