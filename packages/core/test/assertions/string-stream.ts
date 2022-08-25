import { ArrayStream, StringStream } from '../../src/streams/stream-loader';
import { ConvertFunction } from '../../src/types/convert-function';
import { Functional } from '../../src/factories/decorators/functional';

export const assertAndGetDecoratedStringOperator = (stream: StringStream, result: StringStream): ConvertFunction => {
  const functional = result.getFactory() as Functional;

  expect(result).toBeInstanceOf(StringStream);
  expect(functional).toBeInstanceOf(Functional);
  expect(functional.getFactory()).toBe(stream);
  expect(functional.getFunction()).toBeInstanceOf(Function);

  return functional.getFunction();
};

export const assertAndGetDecoratedStringOperatorFromArray = (stream: StringStream, result: ArrayStream): ConvertFunction => {
  const functional = result.getFactory() as Functional;

  expect(result).toBeInstanceOf(ArrayStream);
  expect(functional).toBeInstanceOf(Functional);
  expect(functional.getFactory()).toBe(stream);
  expect(functional.getFunction()).toBeInstanceOf(Function);

  return functional.getFunction();
};
