import { IFactory } from '../factories/interfaces/factory';
import { DEFAULT_PERCENTAGE } from '../constants/limits';
import { BooleanFactory } from '../factories/boolean-factory';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { Stream } from './stream-loader';

/**
 * `BooleanStream` extends the `Stream.<boolean>` class for boolean operations.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/boolean-stream|Docs}
 * @see Stream
 * @class
 * @extends Stream.<boolean>
 */
export class BooleanStream extends Stream<boolean> {
  public constructor(factory: IFactory<boolean>) {
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
