import { BooleanStream } from '../../src/streams/stream-loader';
import { ConvertFunction } from '../../src/types/convert-function';
import { Functional } from '../../src/factories/decorators/functional';

export const assertAndGetDecoratedBooleanOperator = (stream: BooleanStream, result: BooleanStream): ConvertFunction => {
  const functional = result.getFactory() as Functional;

  expect(result).toBeInstanceOf(BooleanStream);
  expect(functional).toBeInstanceOf(Functional);
  expect(functional.getFactory()).toBe(stream);
  expect(functional.getFunction()).toBeInstanceOf(Function);

  return functional.getFunction();
};
