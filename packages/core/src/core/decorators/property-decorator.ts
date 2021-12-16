import { AbstractFactory } from '../abstract-factory';
import { Factory } from '../factory';
import { Assert } from '../../utils/assert';
import { ExtendedObjectModel } from '../types/extended-object-model';

export class PropertyDecorator<S extends keyof any, T = any, K = any> extends AbstractFactory<ExtendedObjectModel<S, T, K>> {
  private readonly factory: Factory<K>;
  private readonly source: Factory<T>;
  private readonly property: S;

  public constructor(source: Factory<T>, factory: Factory<K>, property: S, ) {
    Assert.factoryLike(source);
    Assert.factoryLike(factory);
    Assert.key(property);
    super();
    this.factory = factory;
    this.source = source;
    this.property = property;
  }

  public single(): ExtendedObjectModel<S, T, K> {
    const value = this.source.single() as { [P in S]: K } & T;
    delete value[this.property];
    return { ...value, [this.property]: this.factory.single() };
  }

  public getSource(): Factory<T> {
    return this.source;
  }

  public getFactory(): Factory<K> {
    return this.factory;
  }

  public getProperty(): S {
    return this.property;
  }
}
