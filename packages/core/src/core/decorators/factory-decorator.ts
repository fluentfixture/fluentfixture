import { AbstractFactory } from '../abstract-factory';
import { Factory } from '../factory';
import { ConvertFunction } from '../types/convert-function';
import { Assert } from '../../utils/assert';

export class FactoryDecorator<T = any, K = any> extends AbstractFactory<K> {
  private readonly factory: Factory<T>;
  private readonly decorator: ConvertFunction<T, K>;

  public constructor(factory: Factory<T>, decorator: ConvertFunction<T, K>) {
    Assert.factoryLike(factory);
    Assert.func(decorator);
    super();
    this.factory = factory;
    this.decorator = decorator;
  }

  public single(): K {
    return this.decorator(this.factory.single());
  }

  public getFactory(): Factory<T> {
    return this.factory;
  }

  public getDecorator(): ConvertFunction<T, K> {
    return this.decorator;
  }
}
