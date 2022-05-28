import { ConvertFunction } from '../../types/convert-function';
import { Assert } from '../../assertions/assert';
import { Factory } from '../factory';
import { Decorator } from './decorator';

export class Functional<T = any, K = any> extends Decorator<T, K> {
  private readonly fn: ConvertFunction<T, K>;

  public constructor(factory: Factory<T>, fn: ConvertFunction<T, K>) {
    Assert.isFunction('Functional.constructor(factory, fn)', 'fn', fn);
    super(factory);
    this.fn = fn;
  }

  public single(): K {
    return this.fn(this.factory.single());
  }

  public getFunction(): ConvertFunction<T, K> {
    return this.fn;
  }
}
