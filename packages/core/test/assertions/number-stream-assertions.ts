import { NumberStream } from '../../src/streams/number-stream';
import { FactoryDecorator } from '../../src/core/decorators/factory-decorator';

export const assertNumberSteamWithOperator = (stream: NumberStream, result: NumberStream, value: number, output: number): void => {
  expect(result).toBeInstanceOf(NumberStream);

  const factoryDecorator = result.getFactory() as FactoryDecorator;
  expect(factoryDecorator).toBeInstanceOf(FactoryDecorator);
  expect(factoryDecorator.getFactory()).toBe(stream);
  expect(factoryDecorator.getDecorator()).toBeInstanceOf(Function);

  const decoratorFunction = factoryDecorator.getDecorator();
  expect(decoratorFunction(value)).toBe(output);
};
