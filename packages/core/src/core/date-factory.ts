import { AbstractFactory } from './abstract-factory';
import { Assert } from '../utils/assert';
import { Random } from './engine/random';

export class DateFactory extends AbstractFactory<Date> {
  private readonly min: Date;
  private readonly max: Date;

  public constructor(min: Date, max: Date) {
    Assert.date(min);
    Assert.date(max);
    super();
    this.min = min;
    this.max = max;
  }

  public single(): Date {
    return Random.date(this.min, this.max);
  }
}
