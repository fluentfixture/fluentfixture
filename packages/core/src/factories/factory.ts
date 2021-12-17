import { Assert } from '../utils/assert';
import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from '../constants/limits';
import { IFactory } from './interfaces/factory';

export abstract class Factory<T = any> implements IFactory<T> {

  public abstract single(): T;

  public many(count: number): ReadonlyArray<T> {
    Assert.integer(count);
    Assert.inRange(count, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE);
    return Array.from({ length: count }, () => this.single());
  }
}
