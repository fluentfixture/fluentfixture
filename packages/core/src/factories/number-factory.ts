import { Random } from '../engine/random';
import { Assert } from '../utils/assert';
import { MAX_INTEGER, MIN_INTEGER } from '../constants/limits';
import { Factory } from './factory';

export class NumberFactory extends Factory<number> {
  private readonly min: number;
  private readonly max: number;

  public constructor(min: number, max: number) {
    Assert.isNumber('NumberFactory.constructor(min, max)', 'min', min);
    Assert.inRange(min, MIN_INTEGER, MAX_INTEGER);
    Assert.isNumber('NumberFactory.constructor(min, max)', 'max', max);
    Assert.inRange(max, MIN_INTEGER, MAX_INTEGER);
    super();
    this.min = min;
    this.max = max;
  }

  public single(): number {
    return Random.float(this.min, this.max);
  }

  public getMin(): number {
    return this.min;
  }

  public getMax(): number {
    return  this.max;
  }
}
