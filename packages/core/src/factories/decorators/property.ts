import { Assert } from '../../assertions/assert';
import { ExtendedObjectModel } from '../../types/extended-object-model';
import { Factory } from '../factory';
import { Decorator } from './decorator';

export class Property<S extends keyof any, T = any, K = any> extends Decorator<T, ExtendedObjectModel<S, T, K>> {
  private readonly decorator: Factory<K>;
  private readonly property: S;

  public constructor(factory: Factory<T>, decorator: Factory<K>, property: S) {
    Assert.isFactoryLike('Property.constructor(factory, decorator, property)', 'decorator', decorator);
    Assert.isKey('Property.constructor(factory, decorator, property)', 'property', property);
    super(factory);
    this.property = property;
    this.decorator = decorator;
  }

  public single(): ExtendedObjectModel<S, T, K> {
    const value = this.factory.single() as { [P in S]: K } & T;
    delete value[this.property];
    return { ...value, [this.property]: this.decorator.single() };
  }

  public getDecorator(): Factory<K> {
    return this.decorator;
  }

  public getProperty(): S {
    return this.property;
  }
}
