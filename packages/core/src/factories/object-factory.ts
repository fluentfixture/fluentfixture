import { ObjectModel } from '../types/object-model';
import { Assert } from '../utils/assert';
import { Factory } from './factory';
import { IFactory } from './interfaces/factory';

export class ObjectFactory<T> extends Factory<T> {
  private readonly model: ObjectModel<T>

  public constructor(model: ObjectModel<T>) {
    Assert.object(model);
    super();
    this.model = model;
  }

  public single() {
    return Object.fromEntries(Object.entries(this.model as Record<string, IFactory>).map(([k, v]) => [k, v.single()])) as T;
  }
}
