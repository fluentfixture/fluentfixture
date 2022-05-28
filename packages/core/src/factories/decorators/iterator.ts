import { Assert } from '../../assertions/assert';
import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from '../../constants/limits';
import { Factory } from '../factory';
import { Decorator } from './decorator';

export class Iterator<T = any> extends Decorator<T, ReadonlyArray<T>> {
  private readonly count: number;

  public constructor(factory: Factory<T>, count: number) {
    Assert.isInteger('Iterator.constructor(factory, count)', 'count', count);
    Assert.isInRange('Iterator.constructor(factory, count)', 'count', count, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE);
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
