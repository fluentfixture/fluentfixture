import { ExtendedObjectModel } from '../types/extended-object-model';
import { Property } from '../factories/decorators/property';
import { ObjectFactory } from '../factories/object-factory';
import { ObjectModel } from '../types/object-model';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { ConvertFunction } from '../types/convert-function';
import { Lazy } from '../factories/decorators/lazy';
import { Factory } from '../factories/factory';
import { Stream } from './stream-loader';

export class ObjectStream<T = any> extends Stream<T> {

  public constructor(factory: Factory<T>) {
    super(factory);
  }

  public static of<T>(model:ObjectModel<T>): ObjectStream<T> {
    return new ObjectStream(new ObjectFactory(model));
  }

  public dynamic<S extends keyof any, K>(property: S, factory: Factory<K>): ObjectStream<ExtendedObjectModel<S, T, K>> {
    return new ObjectStream(new Property(this, factory, property));
  }

  public static<S extends keyof any, K>(property: S, value: K): ObjectStream<ExtendedObjectModel<S, T, K>> {
    return new ObjectStream(new Property(this, new ValueAdapter(value), property));
  }

  public lazy<S extends keyof any, K>(property: S, converter: ConvertFunction<T, K>): ObjectStream<ExtendedObjectModel<S, T, K>> {
    return new ObjectStream(new Lazy(this, converter, property));
  }
}
