import { IFactory } from '../interfaces/factory';
import { ConvertFunction } from '../../types/convert-function';
import { Assert } from '../../utils/assert';
import { Decorator } from './decorator';

export class Functional<T = any, K = any> extends Decorator<T, K> {
  private readonly decorator: ConvertFunction<T, K>;

  public constructor(factory: IFactory<T>, decorator: ConvertFunction<T, K>) {
    Assert.func(decorator);
    super(factory);
    this.decorator = decorator;
  }

  public single(): K {
    return this.decorator(this.factory.single());
  }

  public getDecorator(): ConvertFunction<T, K> {
    return this.decorator;
  }
}
