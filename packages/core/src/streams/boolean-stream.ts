import { DEFAULT_PERCENTAGE } from '../constants/limits';
import { BooleanFactory } from '../factories/boolean-factory';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { Factory } from '../factories/factory';
import { Stream } from './stream-loader';

export class BooleanStream extends Stream<boolean> {

  public constructor(factory: Factory<boolean>) {
    super(factory);
  }

  public static truthy(): BooleanStream {
    return new BooleanStream(new ValueAdapter(true));
  }

  public static falsy(): BooleanStream {
    return new BooleanStream(new ValueAdapter(false));
  }

  public static fromPercentage(percentage: number= DEFAULT_PERCENTAGE): BooleanStream {
    return new BooleanStream(new BooleanFactory(percentage));
  }

  public not(): BooleanStream {
    return this.apply((i) => !i);
  }
}
