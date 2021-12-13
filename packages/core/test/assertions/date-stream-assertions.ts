import { FactoryDecorator } from '../../src/core/decorators/factory-decorator';
import { DateStream } from '../../src/streams/date-stream';
import { UnitType } from 'dayjs';
import * as dayjs from 'dayjs';
import { NumberStream } from '../../src/streams/number-stream';

export const assertDateStreamAddOrSubtract = (stream: DateStream, result: DateStream, value: Date, unit: UnitType, output: number): void => {
  expect(result).toBeInstanceOf(DateStream);

  const factoryDecorator = result.getFactory() as FactoryDecorator;
  expect(factoryDecorator).toBeInstanceOf(FactoryDecorator);
  expect(factoryDecorator.getFactory()).toBe(stream);
  expect(factoryDecorator.getDecorator()).toBeInstanceOf(Function);

  const decoratorFunction = factoryDecorator.getDecorator();

  expect(dayjs(decoratorFunction(value)).diff(value,unit)).toBe(output);
};

export const assertDateStreamSet = (stream: DateStream, result: DateStream, value: Date, unit: UnitType, output: number): void => {
  expect(result).toBeInstanceOf(DateStream);

  const factoryDecorator = result.getFactory() as FactoryDecorator;
  expect(factoryDecorator).toBeInstanceOf(FactoryDecorator);
  expect(factoryDecorator.getFactory()).toBe(stream);
  expect(factoryDecorator.getDecorator()).toBeInstanceOf(Function);

  const decoratorFunction = factoryDecorator.getDecorator();

  expect(dayjs(decoratorFunction(value)).get(unit)).toBe(output);
};

export const assertDateStreamGet = (stream: DateStream, result: NumberStream, value: Date, output: number): void => {
  expect(result).toBeInstanceOf(NumberStream);

  const factoryDecorator = result.getFactory() as FactoryDecorator;
  expect(factoryDecorator).toBeInstanceOf(FactoryDecorator);
  expect(factoryDecorator.getFactory()).toBe(stream);
  expect(factoryDecorator.getDecorator()).toBeInstanceOf(Function);

  const decoratorFunction = factoryDecorator.getDecorator();

  expect(decoratorFunction(value)).toBe(output);
};
