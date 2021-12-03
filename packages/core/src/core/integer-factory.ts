import { AbstractFactory } from './abstract-factory';
import { Random } from './engine/random';
import { Assert } from '../utils/assert';
import { MAX_INTEGER, MIN_INTEGER } from '../constants/limits';

export class IntegerFactory extends AbstractFactory<number> {
  private readonly min: number;
  private readonly max: number;

  public constructor(min: number, max: number) {
    Assert.integer(min);
    Assert.inRange(min, MIN_INTEGER, MAX_INTEGER);
    Assert.integer(max);
    Assert.inRange(max, MIN_INTEGER, MAX_INTEGER);
    super();
    this.min = min;
    this.max = max;
  }

  public static between(min: number, max: number): IntegerFactory {
    return new IntegerFactory(min, max);
  }

  public single(): number {
    return Random.integer(this.min, this.max);
  }

  public getMin(): number {
    return this.min;
  }

  public getMax(): number {
    return this.max;
  }
}
