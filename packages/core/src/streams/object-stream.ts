import { IFactory } from '../core/interfaces/factory';
import { ExtendedObjectModel } from '../types/extended-object-model';
import { Property } from '../core/converters/property';
import { ValueStream } from './value-stream';

export class ObjectStream<T = any> extends ValueStream<T> {
  public constructor(factory: IFactory<T>) {
    super(factory);
  }

  public with<S extends keyof any, K>(property: S, factory: IFactory<K>): ObjectStream<ExtendedObjectModel<S, T, K>> {
    return new ObjectStream(new Property(this, factory, property));
  }
}
