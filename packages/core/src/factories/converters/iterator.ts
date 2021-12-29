import { IFactory } from '../interfaces/factory';
import { Assert } from '../../utils/assert';
import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from '../../constants/limits';
import { Converter } from './converter';

export class Iterator<T = any> extends Converter<T, ReadonlyArray<T>> {
  private readonly count: number;

  public constructor(factory: IFactory<T>, count: number) {
    Assert.integer(count);
    Assert.inRange(count, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE);
    super(factory);
    this.count = count;
  }

  public single(): ReadonlyArray<T> {
    return this.factory.many(this.count);
  }

  public getCount(): number {
    return this.count;
  }
}