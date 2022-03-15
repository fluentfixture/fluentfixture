import { Assert } from '../../utils/assert';
import { ExtendedObjectModel } from '../../types/extended-object-model';
import { ConvertFunction } from '../../types/convert-function';
import { Factory } from '../factory';
import { Decorator } from './decorator';

/**
 * `Lazy` decorator decorates a property of an object factory with the given function and property.
 * When the `single()` method is invoked, it generates data using the decorated factory and changes the property with the result of the function.
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
   * @param {Factory.<T>} [factory] - the factory to be decorated
   * @param {function(T):*} [fn] - the source function of the property
   * @param {string} [property] - the property name
   */
  public constructor(factory: Factory<T>, fn: ConvertFunction<T, K>, property: S) {
    Assert.isFunction('Lazy.constructor(factory, fn, property)', 'fn', fn);
    Assert.isKey('Lazy.constructor(factory, fn, property)', 'property', property);
    super(factory);
    this.property = property;
    this.fn = fn;
  }

  /**
   * Generates single data by using the decorated factory, property and function.
   * @see Factory
   * @public
   * @returns {Object.<string, Factory.<*>>}
   */
  public single(): ExtendedObjectModel<S, T, K> {
    const value = this.factory.single() as { [P in S]: K } & T;
    delete value[this.property];
    return { ...value, [this.property]: this.fn(value) };
  }

  /**
   * Returns the source function of the property.
   * @public
   * @returns {Factory.<*>}
   */
  public getFunction(): ConvertFunction<T, K> {
    return this.fn;
  }

  /**
   * Returns the property name.
   * @public
   * @returns {string}
   */
  public getProperty(): S {
    return this.property;
  }
}
