import { Assert } from '../assertions/assert';
import { Random } from '../engine/random';
import { Factory } from './factory';

export class DateFactory extends Factory<Date> {
  private readonly min: Date;
  private readonly max: Date;

  public constructor(min: Date, max: Date) {
    Assert.isDate('DateFactory.constructor(min, max)', 'min', min);
    Assert.isDate('DateFactory.constructor(min, max)', 'max', max);
    super();
    this.min = min;
    this.max = max;
  }

  public single(): Date {
    return Random.date(this.min, this.max);
  }

  public getMin(): Date {
    return this.min;
  }

  public getMax(): Date {
    return  this.max;
  }
}
