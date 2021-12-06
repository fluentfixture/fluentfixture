import { AbstractFactory } from '../abstract-factory';
import { Factory } from '../factory';
import { Random } from '../engine/random';
import { Assert } from '../../utils/assert';
import { MAX_PERCENTAGE, MIN_PERCENTAGE } from '../../constants/limits';

export class Selector<OUT1, OUT2> extends AbstractFactory<OUT1 | OUT2> {
  private readonly factory1: Factory<OUT1>;
  private readonly factory2: Factory<OUT2>;
  private readonly percentage: number;

  public constructor(factory1: Factory<OUT1>, factory2: Factory<OUT2>, percentage: number) {
    Assert.number(percentage);
    Assert.inRange(percentage, MIN_PERCENTAGE, MAX_PERCENTAGE);
    Assert.factoryLike(factory1);
    Assert.factoryLike(factory2);
    super();
    this.factory1 = factory1;
    this.factory2 = factory2;
    this.percentage = percentage;
  }

  public single(): OUT1 | OUT2 {
    return Random.bool(this.percentage)
      ? this.factory1.single()
      : this.factory2.single();
  }
}
