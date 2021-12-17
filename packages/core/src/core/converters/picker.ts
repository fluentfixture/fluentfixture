import { Random } from '../../engine/random';
import { IFactory } from '../interfaces/factory';
import { Converter } from './converter';

export class Picker<T = any> extends Converter<ReadonlyArray<T>, T> {

  public constructor(factory: IFactory<ReadonlyArray<T>>) {
    super(factory);
  }

  public single(): T {
    return Random.pick(this.factory.single());
  }
}
