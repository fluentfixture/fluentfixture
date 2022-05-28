import { Factory } from '../factory';
import { Random } from '../../engine/random';
import { Decorator } from './decorator';

export class Picker<T = any> extends Decorator<ReadonlyArray<T>, T> {

  public constructor(factory: Factory<ReadonlyArray<T>>) {
    super(factory);
  }

  public single(): T {
    return Random.pick(this.factory.single());
  }
}
