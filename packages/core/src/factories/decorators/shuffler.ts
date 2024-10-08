import { Random } from '@fluentfixture/shared';
import { Factory } from '../factory';
import { Decorator } from './decorator';

export class Shuffler<T = any> extends Decorator<ReadonlyArray<T>, ReadonlyArray<T>> {

  public constructor(factory: Factory<ReadonlyArray<T>>) {
    super(factory);
  }

  public single(): ReadonlyArray<T> {
    return Random.shuffle(this.factory.single());
  }
}
