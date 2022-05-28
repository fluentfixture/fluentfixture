import { Assert } from '../assertions/assert';
import { MAX_PERCENTAGE, MIN_PERCENTAGE } from '../constants/limits';
import { Random } from '../engine/random';
import { Factory } from './factory';

export class BooleanFactory extends Factory<boolean> {
  private readonly percentage: number;

  public constructor(percentage: number) {
    Assert.isNumber('BooleanFactory.constructor(percentage)', 'percentage', percentage);
    Assert.isInRange('BooleanFactory.constructor(percentage)', 'percentage', percentage, MIN_PERCENTAGE, MAX_PERCENTAGE);
    super();
    this.percentage = percentage;
  }

  public single(): boolean {
    return Random.bool(this.percentage);
  }

  public getPercentage(): number {
    return this.percentage;
  }
}
