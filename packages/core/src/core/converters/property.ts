import { IFactory } from '../interfaces/factory';
import { Assert } from '../../utils/assert';
import { ExtendedObjectModel } from '../../types/extended-object-model';
import { Converter } from './converter';

export class Property<S extends keyof any, T = any, K = any> extends Converter<T, ExtendedObjectModel<S, T, K>> {
  private readonly decorator: IFactory<K>;
  private readonly property: S;

  public constructor(factory: IFactory<T>, decorator: IFactory<K>, property: S) {
    Assert.factoryLike(decorator);
    Assert.key(property);
    super(factory);
    this.property = property;
    this.decorator = decorator;
  }

  public single(): ExtendedObjectModel<S, T, K> {
    const value = this.factory.single() as { [P in S]: K } & T;
    delete value[this.property];
    return { ...value, [this.property]: this.decorator.single() };
  }

  public getDecorator(): IFactory<K> {
    return this.decorator;
  }

  public getProperty(): S {
    return this.property;
  }
}
