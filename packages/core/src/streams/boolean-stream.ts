import { IFactory } from '../factories/interfaces/factory';
import { ConvertFunction } from '../types/convert-function';
import { Functional } from '../factories/converters/functional';
import { ValueStream } from './value-stream';

export class BooleanStream extends ValueStream<boolean> {
  public constructor(factory: IFactory<boolean>) {
    super(factory);
  }

  public not(): BooleanStream {
    return this.apply((i) => !i);
  }

  private apply(fn: ConvertFunction<boolean, boolean>): BooleanStream {
    return new BooleanStream(new Functional(this, fn));
  }
}
