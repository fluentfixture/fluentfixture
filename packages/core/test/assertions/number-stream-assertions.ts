import { NumberStream } from '../../src/streams/number-stream';
import { assertStreamOperations } from './factory-decorator-assertios';

export const assertNumberStreamDecorator = (stream: NumberStream, result: NumberStream, value: number, output: number): void => {
  expect(result).toBeInstanceOf(NumberStream);

  const decoratorFunction = assertStreamOperations(stream, result);

  expect(decoratorFunction(value)).toBe(output);
};
