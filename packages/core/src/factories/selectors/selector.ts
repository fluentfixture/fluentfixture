import { Factory } from '../factory';
import { Random } from '../../engine/random';
import { Assert } from '../../assertions/assert';
import { MAX_PERCENTAGE, MIN_PERCENTAGE } from '../../constants/limits';

export class Selector<T = any, K = any> extends Factory<T | K> {
  private readonly factory1: Factory<T>;
  private readonly factory2: Factory<K>;
  private readonly percentage: number;

  public constructor(factory1: Factory<T>, factory2: Factory<K>, percentage: number) {
    Assert.isNumber('Selector.constructor(factory1, factory2, percentage)', 'percentage', percentage);
    Assert.isInRange('Selector.constructor(factory1, factory2, percentage)', 'percentage', percentage, MIN_PERCENTAGE, MAX_PERCENTAGE);
    Assert.isFactoryLike('Selector.constructor(factory1, factory2, percentage)', 'factory1', factory1);
    Assert.isFactoryLike('Selector.constructor(factory1, factory2, percentage)', 'factory2', factory2);
    super();
    this.factory1 = factory1;
    this.factory2 = factory2;
    this.percentage = percentage;
  }

  public single(): T | K {
    return Random.bool(this.percentage)
      ? this.factory1.single()
      : this.factory2.single();
  }

  public getPercentage(): number {
    return this.percentage;
  }

  public getFactory1(): Factory<T> {
    return this.factory1;
  }

  public getFactory2(): Factory<K> {
    return this.factory2;
  }
}
