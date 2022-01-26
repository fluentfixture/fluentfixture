import { ObjectModel } from '../types/object-model';
import { ObjectStream } from '../streams/stream-loader';

/**
 * Creates an `ObjectStream` that generates an object with the given model.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/object-generators#obj-model|Docs}
 * @see ObjectStream
 * @public
 * @template T
 * @param {Object.<string, IFactory.<T>>} [model] - a key-value object model that all keys are an instance of a factory
 * @returns {ObjectStream.<T>}
 */
export const obj = <T = any>(model: ObjectModel<T>): ObjectStream<T> => ObjectStream.of(model);
