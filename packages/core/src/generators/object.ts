import { ObjectModel } from '../types/object-model';
import { ObjectStream } from '../streams/stream-loader';

/**
 * Creates an `ObjectStream` that generates an object with the given mode.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/object-generators#obj-model|Docs}
 * @param {*} [model] - a key-value object model that all keys are an instance of a factory
 * @returns {ObjectStream} ObjectStream
 */
export const obj = <T = any>(model: ObjectModel<T>): ObjectStream<T> => ObjectStream.of(model);
