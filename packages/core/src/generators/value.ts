import { Stream } from '../streams/stream-loader';
import { ProducerFunction } from '../types/producer-function';

export const nil = (): Stream<null> => val(null);

export const undef = (): Stream<undefined> => val(undefined);

export const val = <T = any>(value: T): Stream<T> => Stream.fromValue(value);

export const from = <T = any>(fn: ProducerFunction<T>): Stream<T> => Stream.fromResult(fn);
