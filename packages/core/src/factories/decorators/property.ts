import { IFactory } from '../interfaces/factory';
import { Assert } from '../../utils/assert';
import { ExtendedObjectModel } from '../../types/extended-object-model';
import { Decorator } from './decorator';

/**
 * The `Property` decorator is an object decorator that extends the underlying object model.
 * It takes a factory, a property and a factory according to the given key.
 * It is useful for generating conditional mock data.
 * The `Property` decorator does not store a state and does not alter the result of the given factory.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/decorators|Decorators}
 * @class
 * @template T
 * @extends Decorator.<T,T>
 */
export class Property<S extends keyof any, T = any, K = any> extends Decorator<T, ExtendedObjectModel<S, T, K>> {
  private readonly decorator: IFactory<K>;
  private readonly property: S;

  /**
   * Creates an instance of `Property`.
   * @constructor
   * @param {IFactory.<T>} [factory] - the factory to be decorated
   * @param {IFactory.<*>} [decorator] - the source factory of the property
   * @param {string} [property] - the property name
   */
  public constructor(factory: IFactory<T>, decorator: IFactory<K>, property: S) {
    Assert.isFactoryLike('Property.constructor(factory, decorator, property)', 'decorator', decorator);
    Assert.isKey('Property.constructor(factory, decorator, property)', 'property', property);
    super(factory);
    this.property = property;
    this.decorator = decorator;
  }

  /**
   * Generates a data by using the decorated `Factory`.
   * @see IFactory
   * @returns {T}
   */
  public single(): ExtendedObjectModel<S, T, K> {
    const value = this.factory.single() as { [P in S]: K } & T;
    delete value[this.property];
    return { ...value, [this.property]: this.decorator.single() };
  }

  /**
   * Returns the source factory of the property.
   * @returns {IFactory.<*>}
   */
  public getDecorator(): IFactory<K> {
    return this.decorator;
  }

  /**
   * Returns the property name
   * @returns {string}
   */
  public getProperty(): S {
    return this.property;
  }
}
