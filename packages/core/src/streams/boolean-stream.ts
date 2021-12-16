import { ValueStream } from './value-stream';
import { Factory } from '../core/factory';
import { ConvertFunction } from '../core/types/convert-function';
import { FactoryDecorator } from '../core/decorators/factory-decorator';

export class BooleanStream extends ValueStream<boolean> {
  public constructor(factory: Factory<boolean>) {
    super(factory);
  }

  public not(): BooleanStream {
    return this.apply((i) => !i);
  }

  private apply(fn: ConvertFunction<boolean, boolean>): BooleanStream {
    return new BooleanStream(new FactoryDecorator(this, fn));
  }
}
