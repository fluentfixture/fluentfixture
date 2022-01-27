import { ObjectModel } from '../types/object-model';
import { Assert } from '../utils/assert';
import { Factory } from './factory';

/**
 * `ObjectFactory` generates an `object` by using the given model.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/factories/creators/object-factory|Docs}
 * @see Factory
 * @class
 * @extends {Factory.<Object>}
 */
export class ObjectFactory<T> extends Factory<T> {
  private readonly model: ObjectModel<T>

  /**
   * Creates an instance of `ObjectFactory`.
   * @constructor
   * @param {Object.<string, Factory.<*>>} [model] - a key-value object that values are factory
   */
  public constructor(model: ObjectModel<T>) {
    Assert.isObjectModel('ObjectFactory.constructor(model)', 'model', model);
    super();
    this.model = model;
  }

  /**
   * Generates single object.
   * @public
   * @returns {Object}
   */
  public single(): T {
    const result = { } as T;
    for (const key of Object.keys(this.model)) {
      result[key] = this.model[key].single();
    }
    return result;
  }

  /**
   * Returns the model.
   * @public
   * @returns {Object.<string, Factory.<*>>}
   */
  public getModel(): ObjectModel<T> {
    return this.model;
  }
}
