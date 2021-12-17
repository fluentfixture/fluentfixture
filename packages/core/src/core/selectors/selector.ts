import { Factory } from '../factory';
import { IFactory } from '../interfaces/factory';
import { Random } from '../../engine/random';
import { Assert } from '../../utils/assert';
import { MAX_PERCENTAGE, MIN_PERCENTAGE } from '../../constants/limits';

export class Selector<T = any, K = any> extends Factory<T | K> {
  private readonly factory1: IFactory<T>;
  private readonly factory2: IFactory<K>;
  private readonly percentage: number;

  public constructor(factory1: IFactory<T>, factory2: IFactory<K>, percentage: number) {
    Assert.number(percentage);
    Assert.inRange(percentage, MIN_PERCENTAGE, MAX_PERCENTAGE);
    Assert.factoryLike(factory1);
    Assert.factoryLike(factory2);
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

  public getFactory1(): IFactory<T> {
    return this.factory1;
  }

  public getFactory2(): IFactory<K> {
    return this.factory2;
  }
}
