import { Stream } from '../../src/streams/stream';
import { MapFunction } from '../../src/core/types/map-function';
import { FactoryDecorator } from '../../src/core/decorators/factory-decorator';

export const assertStreamOperations = (stream: Stream, result: Stream): MapFunction => {
  const factoryDecorator = result.getFactory() as FactoryDecorator;

  expect(factoryDecorator).toBeInstanceOf(FactoryDecorator);
  expect(factoryDecorator.getFactory()).toBe(stream);
  expect(factoryDecorator.getDecorator()).toBeInstanceOf(Function);

  return factoryDecorator.getDecorator();
};
