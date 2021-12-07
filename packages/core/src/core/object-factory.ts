import { AbstractFactory } from './abstract-factory';
import { Factory } from './factory';
import { ObjectModel } from './types/object-model';
import { Assert } from '../utils/assert';

export class ObjectFactory<T> extends AbstractFactory<T> {
  private readonly model: ObjectModel<T>

  public constructor(model: ObjectModel<T>) {
    Assert.object(model);
    super();
    this.model = model;
  }

  public single() {
    return Object.fromEntries(Object.entries(this.model as Record<string, Factory>).map(([k, v]) => [k, v.single()])) as T;
  }
}
