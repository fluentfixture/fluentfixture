import { Stream } from '../../src/streams/stream';
import { ConvertFunction } from '../../src/core/types/convert-function';
import { FactoryDecorator } from '../../src/core/decorators/factory-decorator';

export const assertStreamOperations = (stream: Stream, result: Stream): ConvertFunction => {
  const factoryDecorator = result.getFactory() as FactoryDecorator;

  expect(factoryDecorator).toBeInstanceOf(FactoryDecorator);
  expect(factoryDecorator.getFactory()).toBe(stream);
  expect(factoryDecorator.getDecorator()).toBeInstanceOf(Function);

  return factoryDecorator.getDecorator();
};
