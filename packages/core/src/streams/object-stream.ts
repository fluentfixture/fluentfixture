import { ValueStream } from './value-stream';
import { Factory } from '../core/factory';
import { ExtendedObjectModel } from '../core/types/extended-object-model';
import { PropertyDecorator } from '../core/decorators/property-decorator';

export class ObjectStream<T = any> extends ValueStream<T> {
  public constructor(factory: Factory<T>) {
    super(factory);
  }

  public with<S extends keyof any, K>(property: S, factory: Factory<K>): ObjectStream<ExtendedObjectModel<S, T, K>> {
    return new ObjectStream(new PropertyDecorator(this, factory, property));
  }
}
