import { ObjectModel } from '../types/object-model';
import { ObjectStream } from '../streams/object-stream';

export const obj = <T = any>(model: ObjectModel<T>): ObjectStream<T> => ObjectStream.of(model);
