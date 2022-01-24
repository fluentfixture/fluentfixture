import { Stream } from '../../src/streams/stream-loader';
import { ConvertFunction } from '../../src/types/convert-function';
import { Functional } from '../../src/factories/decorators/functional';

export const assertStreamOperations = (stream: Stream, result: Stream): ConvertFunction => {
  const functional = result.getFactory() as Functional;

  expect(functional).toBeInstanceOf(Functional);
  expect(functional.getFactory()).toBe(stream);
  expect(functional.getDecorator()).toBeInstanceOf(Function);

  return functional.getDecorator();
};
