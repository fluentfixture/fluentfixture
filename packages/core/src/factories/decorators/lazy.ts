import { IFactory } from '../interfaces/factory';
import { Assert } from '../../utils/assert';
import { ExtendedObjectModel } from '../../types/extended-object-model';
import { ConvertFunction } from '../../types/convert-function';
import { Decorator } from './decorator';

/**
 * The `Lazy` decorator is an object decorator that extends the underlying object model.
 * It takes a factory, a property and a function that takes the previous state of the mock data according to the given key.
 * It is useful for generating conditional mock data.
 * The `Lazy` decorator does not store a state and does not alter the result of the given factory.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/decorators|Decorators}
 * @class
 * @template T
 * @extends Decorator.<T,T>
 */
export class Lazy<S extends keyof any, T = any, K = any> extends Decorator<T, ExtendedObjectModel<S, T, K>> {
  private readonly fn: ConvertFunction<T, K>;
  private readonly property: S;

  /**
   * Creates an instance of `Lazy`.
   * @constructor
   * @param {IFactory.<T>} [factory] - the factory to be decorated
   * @param {function(T):*} [fn] - the source function of the property
   * @param {string} [property] - the property name
   */
  public constructor(factory: IFactory<T>, fn: ConvertFunction<T, K>, property: S) {
    Assert.isFunction('Lazy.constructor(factory, fn, property)', 'fn', fn);
    Assert.isKey('Lazy.constructor(factory, fn, property)', 'property', property);
    super(factory);
    this.property = property;
    this.fn = fn;
  }

  /**
   * Generates a data by using the decorated `Factory`.
   * @see IFactory
   * @returns {T}
   */
  public single(): ExtendedObjectModel<S, T, K> {
    const value = this.factory.single() as { [P in S]: K } & T;
    delete value[this.property];
    return { ...value, [this.property]: this.fn(value) };
  }

  /**
   * Returns the source function of the property.
   * @returns {function(T):*}
   */
  public getFunction(): ConvertFunction<T, K> {
    return this.fn;
  }

  /**
   * Returns the property name
   * @returns {string}
   */
  public getProperty(): S {
    return this.property;
  }
}
