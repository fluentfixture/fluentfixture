import { Random } from '../engine/random';
import { Assert } from '../assertions/assert';
import { MAX_INTEGER, MIN_INTEGER } from '../constants/limits';
import { Factory } from './factory';

export class IntegerFactory extends Factory<number> {
  private readonly min: number;
  private readonly max: number;

  public constructor(min: number, max: number) {
    Assert.isInteger('IntegerFactory.constructor(min, max)', 'min', min);
    Assert.isInRange('IntegerFactory.constructor(min, max)', 'min', min, MIN_INTEGER, MAX_INTEGER);
    Assert.isInteger('IntegerFactory.constructor(min, max)', 'max', max);
    Assert.isInRange('IntegerFactory.constructor(min, max)', 'max', max, MIN_INTEGER, MAX_INTEGER);
    super();
    this.min = min;
    this.max = max;
  }

  public single(): number {
    return Random.integer(this.min, this.max);
  }

  public getMin(): number {
    return this.min;
  }

  public getMax(): number {
    return  this.max;
  }
}
