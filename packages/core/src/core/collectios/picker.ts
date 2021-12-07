import { AbstractFactory } from '../abstract-factory';
import { Random } from '../engine/random';
import { Assert } from '../../utils/assert';

export class Picker<T> extends AbstractFactory<T> {
  private readonly list: ReadonlyArray<T>;

  public constructor(list: ReadonlyArray<T>) {
    Assert.nonEmptyArray(list);
    super();
    this.list = list;
  }

  public single(): T {
    return Random.pick(this.list);
  }
}
