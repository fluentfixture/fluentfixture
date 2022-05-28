import { ObjectModel } from '../types/object-model';
import { Assert } from '../assertions/assert';
import { Factory } from './factory';

export class ObjectFactory<T> extends Factory<T> {
  private readonly model: ObjectModel<T>

  public constructor(model: ObjectModel<T>) {
    Assert.isObjectModel('ObjectFactory.constructor(model)', 'model', model);
    super();
    this.model = model;
  }

  public single(): T {
    const result = { } as T;
    for (const key of Object.keys(this.model)) {
      result[key] = this.model[key].single();
    }
    return result;
  }

  public getModel(): ObjectModel<T> {
    return this.model;
  }
}
