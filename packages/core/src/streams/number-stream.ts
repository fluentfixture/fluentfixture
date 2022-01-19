import { IFactory } from '../factories/interfaces/factory';
import { NumberFactory } from '../factories/number-factory';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { Stream } from './stream-loader';

export class NumberStream extends Stream<number> {
  public constructor(factory: IFactory<number>) {
    super(factory);
  }

  public static between(min: number, max: number): NumberStream {
    return new NumberStream(new NumberFactory(min, max));
  }

  public static constant(num: number): NumberStream {
    return new NumberStream(new ValueAdapter(num));
  }

  public mode(num: number): NumberStream {
    return this.apply((i) => i % num);
  }

  public add(num: number): NumberStream {
    return this.apply((i) => i + num);
  }

  public subtract(num: number): NumberStream {
    return this.apply((i) => i - num);
  }

  public multiply(num: number): NumberStream {
    return this.apply((i) => i * num);
  }

  public divide(num: number): NumberStream {
    return this.apply((i) => i / num);
  }
}
