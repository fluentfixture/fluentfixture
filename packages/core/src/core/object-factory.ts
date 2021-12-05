import { AbstractFactory } from './abstract-factory';
import { Factory } from './factory';
import { ObjectModel } from './types/object-model';
import { Assert } from '../utils/assert';

export class ObjectFactory<OUT> extends AbstractFactory<OUT> {
  private readonly model: ObjectModel<OUT>

  public constructor(model: ObjectModel<OUT>) {
    Assert.object(model);
    super();
    this.model = model;
  }

  public single() {
    return Object.fromEntries(Object.entries(this.model as Record<string, Factory>).map(([k, v]) => [k, v.single()])) as OUT;
  }
}
