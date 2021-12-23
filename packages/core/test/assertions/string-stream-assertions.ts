import { StringStream } from '../../src/streams/stream-loader';
import { assertStreamOperations } from './functional-converter-assertions';

export const assertStringStreamDecorator = (stream: StringStream, result: StringStream, value: string, output: string): void => {
  expect(result).toBeInstanceOf(StringStream);

  const decoratorFunction = assertStreamOperations(stream, result);

  expect(decoratorFunction(value)).toBe(output);
};
