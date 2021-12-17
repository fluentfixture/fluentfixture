import { IFactory } from '../core/interfaces/factory';
import { ConvertFunction } from '../types/convert-function';
import { Functional } from '../core/converters/functional';
import { ValueStream } from './value-stream';

export class NumberStream extends ValueStream<number> {
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
