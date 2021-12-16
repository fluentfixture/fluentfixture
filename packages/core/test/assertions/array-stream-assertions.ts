import { assertStreamOperations } from './factory-decorator-assertios';
import { ArrayStream } from '../../src/streams/array-stream';

export const assertArrayStreamDecorator = (stream: ArrayStream, result: ArrayStream, value: Array<any>, output: Array<any>): void => {
  expect(result).toBeInstanceOf(ArrayStream);

  const decoratorFunction = assertStreamOperations(stream, result);

  expect(decoratorFunction(value)).toStrictEqual(output);
};
