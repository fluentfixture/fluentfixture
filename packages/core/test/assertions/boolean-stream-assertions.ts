import { BooleanStream } from '../../src/streams/boolean-stream';
import { assertStreamOperations } from './factory-decorator-assertios';

export const assertBooleanStreamDecorator = (stream: BooleanStream, result: BooleanStream, value: boolean, output: boolean): void => {
  expect(result).toBeInstanceOf(BooleanStream);

  const decoratorFunction = assertStreamOperations(stream, result);

  expect(decoratorFunction(value)).toBe(output);
};
