import { IFactory } from '../factories/interfaces/factory';
import { ExtendedObjectModel } from '../types/extended-object-model';
import { Property } from '../factories/converters/property';
import { Stream } from './stream-loader';

export class ObjectStream<T = any> extends Stream<T> {
  public constructor(factory: IFactory<T>) {
    super(factory);
  }

  public with<S extends keyof any, K>(property: S, factory: IFactory<K>): ObjectStream<ExtendedObjectModel<S, T, K>> {
    return new ObjectStream(new Property(this, factory, property));
  }
}
