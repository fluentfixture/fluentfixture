import { ValueStream } from './value-stream';
import { Factory } from '../core/factory';
import { MapFunction } from '../core/types/map-function';
import { FactoryDecorator } from '../core/decorators/factory-decorator';

export class NumberStream extends ValueStream<number> {
  public constructor(factory: Factory<number>) {
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

  private apply(fn: MapFunction<number, number>): NumberStream {
    return new NumberStream(new FactoryDecorator(this, fn));
  }
}
