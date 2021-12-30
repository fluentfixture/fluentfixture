import { Stream } from '../streams/stream-loader';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { ProducerFunction } from '../types/producer-function';
import { FunctionAdapter } from '../factories/adapters/function-adapter';

export const nil = (): Stream<null> => val(null);

export const undef = (): Stream<undefined> => val();

export const val = <T = any>(value?: T): Stream<T> => Stream.from(new ValueAdapter(value));

export const from = <T = any>(fn: ProducerFunction<T>): Stream<T> => Stream.from(new FunctionAdapter(fn));
