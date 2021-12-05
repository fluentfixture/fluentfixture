import { AbstractFactory } from '../abstract-factory';
import { Random } from '../engine/random';
import { Assert } from '../../utils/assert';

export class Picker<OUT> extends AbstractFactory<OUT> {
  private readonly list: ReadonlyArray<OUT>;

  public constructor(list: ReadonlyArray<OUT>) {
    Assert.nonEmptyArray(list);
    super();
    this.list = list;
  }

  public single(): OUT {
    return Random.pick(this.list);
  }
}
