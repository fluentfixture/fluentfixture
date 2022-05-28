import { Factory } from '../factory';
import { Random } from '../../engine/random';
import { Assert } from '../../assertions/assert';
import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from '../../constants/limits';
import { Decorator } from './decorator';

export class Sampler<T = any> extends Decorator<ReadonlyArray<T>, ReadonlyArray<T>> {
  private readonly size: number;

  public constructor(factory: Factory<ReadonlyArray<T>>, size: number) {
    Assert.isInteger('Sampler.constructor(factory, size)', 'size', size);
    Assert.isInRange('Sampler.constructor(factory, size)', 'size', size, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE);
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
