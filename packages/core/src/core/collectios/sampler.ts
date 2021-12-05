import { AbstractFactory } from '../abstract-factory';
import { Random } from '../engine/random';
import { Assert } from '../../utils/assert';

export class Sampler<OUT> extends AbstractFactory<ReadonlyArray<OUT>> {
  private readonly size: number;
  private readonly list: ReadonlyArray<OUT>;

  public constructor(list: ReadonlyArray<OUT>, size: number) {
    Assert.integer(size);
    Assert.nonEmptyArray(list);
    Assert.inRange(size, 0, list.length);
    super();
    this.list = list;
    this.size = size;
  }

  public single(): ReadonlyArray<OUT> {
    return Random.sample(this.list, this.size);
  }
}
