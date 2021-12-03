import { Factory } from './factory';
import { Assert } from '../utils/assert';
import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from '../constants/limits';

export abstract class AbstractFactory<OUT = any> implements Factory<OUT> {
  public abstract single(): OUT;

  public many(count: number): ReadonlyArray<OUT> {
    Assert.integer(count);
    Assert.inRange(count, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE);
    return Array.from({ length: count }, () => this.single());
  }
}
