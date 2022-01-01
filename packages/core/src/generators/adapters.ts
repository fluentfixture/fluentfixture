import { ArrayStream, Stream } from '../streams/stream-loader';
import { ProducerFunction } from '../types/producer-function';
import { DEFAULT_SAMPLE_COUNT } from '../constants/limits';

export const nil = (): Stream<null> => val(null);

export const undef = (): Stream<undefined> => val();

export const val = <T = any>(value?: T): Stream<T> => Stream.fromValue(value);

export const from = <T = any>(fn: ProducerFunction<T>): Stream<T> => Stream.fromResult(fn);

export const pick = <T = any>(arr: ReadonlyArray<T>): Stream<T> => ArrayStream.fromList(arr).pick();

export const take = <T = any>(arr: ReadonlyArray<T>, count: number = DEFAULT_SAMPLE_COUNT): ArrayStream<T> => ArrayStream.fromList(arr).sample(count);

export const shuffle = <T = any>(arr: ReadonlyArray<T>): ArrayStream<T> => ArrayStream.fromList(arr).shuffle();
