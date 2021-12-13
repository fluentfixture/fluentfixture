import { FactoryDecorator } from '../../src/core/decorators/factory-decorator';
import { BooleanStream } from '../../src/streams/boolean-stream';

export const assertBooleanSteamWithOperator = (stream: BooleanStream, result: BooleanStream, value: boolean, output: boolean): void => {
  expect(result).toBeInstanceOf(BooleanStream);

  const factoryDecorator = result.getFactory() as FactoryDecorator;
  expect(factoryDecorator).toBeInstanceOf(FactoryDecorator);
  expect(factoryDecorator.getFactory()).toBe(stream);
  expect(factoryDecorator.getDecorator()).toBeInstanceOf(Function);

  const decoratorFunction = factoryDecorator.getDecorator();
  expect(decoratorFunction(value)).toBe(output);
};
