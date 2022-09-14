import { NumberStream, Stream, StringStream } from '../streams/stream-loader';

export const asString = <T extends NonNullable<string>>(stream: Stream<T>): StringStream => new StringStream(stream.getFactory());

export const asNumber = <T extends NonNullable<number>>(stream: Stream<T>): NumberStream => new NumberStream(stream.getFactory());

