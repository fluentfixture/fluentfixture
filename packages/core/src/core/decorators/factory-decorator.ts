import { AbstractFactory } from '../abstract-factory';
import { Factory } from '../factory';
import { MapFunction } from '../types/map-function';
import { Assert } from '../../utils/assert';

export class FactoryDecorator<IN, OUT> extends AbstractFactory<OUT> {
  private readonly factory: Factory<IN>;
  private readonly decorator: MapFunction<IN, OUT>;

  public constructor(factory: Factory<IN>, decorator: MapFunction<IN, OUT>) {
    Assert.factoryLike(factory);
    Assert.func(decorator);
    super();
    this.factory = factory;
    this.decorator = decorator;
  }

  public single(): OUT {
    return this.decorator(this.factory.single());
  }
}
