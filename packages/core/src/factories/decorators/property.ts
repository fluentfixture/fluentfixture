import { Assert } from '../../assertions/assert';
import { ExtendedObjectModel } from '../../types/extended-object-model';
import { Factory } from '../factory';
import { Decorator } from './decorator';

/**
 * `Property` decorator decorates a property of an object factory with the given factory and property.
 * When the `single()` method is invoked, it generates data using the decorated factory and changes the property with the result of the decorator factory.
 * @class
 * @template T
 * @extends Decorator.<T,T>
 */
export class Property<S extends keyof any, T = any, K = any> extends Decorator<T, ExtendedObjectModel<S, T, K>> {
  private readonly decorator: Factory<K>;
  private readonly property: S;

  /**
   * Creates an instance of `Property`.
   * @constructor
   * @param {Factory.<T>} [factory] - the factory to be decorated
   * @param {Factory.<*>} [decorator] - the source factory of the property
   * @param {string} [property] - the property name
   */
  public constructor(factory: Factory<T>, decorator: Factory<K>, property: S) {
    Assert.isFactoryLike('Property.constructor(factory, decorator, property)', 'decorator', decorator);
    Assert.isKey('Property.constructor(factory, decorator, property)', 'property', property);
    super(factory);
    this.property = property;
    this.decorator = decorator;
  }

  /**
   * Generates single data by using the decorated factory, property and decorator factory.
   * @see Factory
   * @public
   * @returns {Object.<string, Factory.<*>>}
   */
  public single(): ExtendedObjectModel<S, T, K> {
    const value = this.factory.single() as { [P in S]: K } & T;
    delete value[this.property];
    return { ...value, [this.property]: this.decorator.single() };
  }

  /**
   * Returns the source factory of the property.
   * @public
   * @returns {Factory.<*>}
   */
  public getDecorator(): Factory<K> {
    return this.decorator;
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
