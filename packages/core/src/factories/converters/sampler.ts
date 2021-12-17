import { Random } from '../../engine/random';
import { Assert } from '../../utils/assert';
import { IFactory } from '../interfaces/factory';
import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from '../../constants/limits';
import { Converter } from './converter';

export class Sampler<T = any> extends Converter<ReadonlyArray<T>, ReadonlyArray<T>> {
  private readonly size: number;

  public constructor(factory: IFactory<ReadonlyArray<T>>, size: number) {
    Assert.integer(size);
    Assert.inRange(size, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE);
    super(factory);
    this.size = size;
  }

  public single(): ReadonlyArray<T> {
    return Random.sample(this.factory.single(), this.size);
  }

  public getSize(): number {
    return this.size;
  }
}
