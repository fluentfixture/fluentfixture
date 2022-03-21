import { NumberStream} from '../../src/streams/stream-loader';
import { ConvertFunction } from '../../src/types/convert-function';
import { Functional } from '../../src/factories/decorators/functional';

export const assertAndGetDecoratedNumberOperator = (stream: NumberStream, result: NumberStream): ConvertFunction => {
  const functional = result.getFactory() as Functional;

  expect(result).toBeInstanceOf(NumberStream);
  expect(functional).toBeInstanceOf(Functional);
  expect(functional.getFactory()).toBe(stream);
  expect(functional.getFunction()).toBeInstanceOf(Function);

  return functional.getFunction();
};
