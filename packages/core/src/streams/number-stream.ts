import { IFactory } from '../factories/interfaces/factory';
import { ConvertFunction } from '../types/convert-function';
import { Functional } from '../factories/converters/functional';
import { Stream } from './stream-loader';

export class NumberStream extends Stream<number> {
  public constructor(factory: IFactory<number>) {
    super(factory);
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

  private apply(fn: ConvertFunction<number, number>): NumberStream {
    return new NumberStream(new Functional(this, fn));
  }
}
