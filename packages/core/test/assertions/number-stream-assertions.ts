import { NumberStream } from '../../src/streams/number-stream';
import { assertStreamOperations } from './functional-converter-assertions';

export const assertNumberStreamDecorator = (stream: NumberStream, result: NumberStream, value: number, output: number): void => {
  expect(result).toBeInstanceOf(NumberStream);

  const decoratorFunction = assertStreamOperations(stream, result);

  expect(decoratorFunction(value)).toBe(output);
};
