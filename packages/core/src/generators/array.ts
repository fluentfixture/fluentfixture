import { ArrayStream, Stream } from '../streams/stream-loader';
import { DEFAULT_SAMPLE_COUNT } from '../constants/limits';

export const list = <T = any>(array: ReadonlyArray<T>): ArrayStream<T> => ArrayStream.fromList(array);
export const pick = <T = any>(array: ReadonlyArray<T>): Stream<T> => ArrayStream.fromList(array).pick();
export const sample = <T = any>(array: ReadonlyArray<T>, count: number = DEFAULT_SAMPLE_COUNT): ArrayStream<T> => ArrayStream.fromList(array).sample(count);
export const shuffle = <T = any>(array: ReadonlyArray<T>): ArrayStream<T> => ArrayStream.fromList(array).shuffle();
