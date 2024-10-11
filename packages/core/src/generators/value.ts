import { Stream } from '../streams/stream-loader';
import { ProducerFunction } from '../types/producer-function';

const NIL = Stream.fromValue(null);
const UNDEF = Stream.fromValue(undefined);

export const val = <T = any>(value: T): Stream<T> => Stream.fromValue(value);
export const from = <T = any>(fn: ProducerFunction<T>): Stream<T> => Stream.fromResult(fn);
export const nil = (): Stream<null> => NIL;
export const undef = (): Stream<undefined> => UNDEF;
