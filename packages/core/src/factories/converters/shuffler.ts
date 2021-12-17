import { IFactory } from '../interfaces/factory';
import { Random } from '../../engine/random';
import { Converter } from './converter';

export class Shuffler<T = any> extends Converter<ReadonlyArray<T>, ReadonlyArray<T>> {

  public constructor(factory: IFactory<ReadonlyArray<T>>) {
    super(factory);
  }

  public single(): ReadonlyArray<T> {
    return Random.shuffle(this.factory.single());
  }
}
