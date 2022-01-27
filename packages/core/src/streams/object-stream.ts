import { ExtendedObjectModel } from '../types/extended-object-model';
import { Property } from '../factories/decorators/property';
import { ObjectFactory } from '../factories/object-factory';
import { ObjectModel } from '../types/object-model';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { ConvertFunction } from '../types/convert-function';
import { Lazy } from '../factories/decorators/lazy';
import { Factory } from '../factories/factory';
import { Stream } from './stream-loader';

/**
 * @todo Make JSDOC comments more type-safe.
 * @body `dynamic`, `static` and `lazy` method's JSDOC comments are not type-safe.
 */

/**
 * `ObjectStream` extends the `Stream.<object>` class for object operations.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/object-stream|Docs}
 * @see Stream
 * @class
 * @template T
 * @extends Stream.<object>
 */
export class ObjectStream<T = any> extends Stream<T> {

  /**
   * Creates an instance of `ObjectStream.<T>`.
   * @constructor
   * @param {Factory.<Object.<string, Factory.<T>>>} [factory] - the factory to be decorated
   */
  public constructor(factory: Factory<T>) {
    super(factory);
  }

  /**
   * Creates an `ObjectStream.<T>` with `ObjectFactory` and the given model.
   * @see ObjectFactory
   * @static
   * @public
   * @param {Object.<string, Factory.<T>>} [model] - a key-value object model that all keys are an instance of a factory
   * @returns {ObjectStream.<T>}
   */
  public static of<T>(model:ObjectModel<T>): ObjectStream<T> {
    return new ObjectStream(new ObjectFactory(model));
  }

  /**
   * Creates a `ObjectStream.<T>` with `Property` decorator, the given property and factory.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/object-stream#dynamic-property-factory|Docs}
   * @see Property
   * @public
   * @param {string} [property] - the property name
   * @param {Factory.<*>} [factory] - the source factory of the property
   * @returns {ObjectStream.<T>}
   */
  public dynamic<S extends keyof any, K>(property: S, factory: Factory<K>): ObjectStream<ExtendedObjectModel<S, T, K>> {
    return new ObjectStream(new Property(this, factory, property));
  }

  /**
   * Creates a `ObjectStream.<T>` with `Property` decorator, the given property and value.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/object-stream#static-property-value|Docs}
   * @see Property
   * @public
   * @param {string} [property] - the property name
   * @param {*} [value] - the value of the property
   * @returns {ObjectStream.<T>}
   */
  public static<S extends keyof any, K>(property: S, value: K): ObjectStream<ExtendedObjectModel<S, T, K>> {
    return new ObjectStream(new Property(this, new ValueAdapter(value), property));
  }

  /**
   * Creates a `ObjectStream.<T>` with `Lazy` decorator, the given property and function.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/object-stream#lazy-property-fn|Docs}
   * @see Lazy
   * @public
   * @param {string} [property] - the property name
   * @param {function(T):*} [converter] - the source function of the property
   * @returns {ObjectStream.<T>}
   */
  public lazy<S extends keyof any, K>(property: S, converter: ConvertFunction<T, K>): ObjectStream<ExtendedObjectModel<S, T, K>> {
    return new ObjectStream(new Lazy(this, converter, property));
  }
}
