import { UnitType } from 'dayjs';
import * as dayjs from 'dayjs';
import { NumberStream, DateStream } from '../../src/streams/stream-loader';
import { assertStreamOperations } from './functional-converter-assertions';

export const assertDateStreamAddOrSubtract = (stream: DateStream, result: DateStream, value: Date, unit: UnitType, output: number): void => {
  expect(result).toBeInstanceOf(DateStream);

  const decoratorFunction = assertStreamOperations(stream, result);

  expect(dayjs(decoratorFunction(value)).diff(value,unit)).toBe(output);
};

export const assertDateStreamSet = (stream: DateStream, result: DateStream, value: Date, unit: UnitType, output: number): void => {
  expect(result).toBeInstanceOf(DateStream);

  const decoratorFunction = assertStreamOperations(stream, result);

  expect(dayjs(decoratorFunction(value)).get(unit)).toBe(output);
};

export const assertDateStreamGet = (stream: DateStream, result: NumberStream, value: Date, output: number): void => {
  expect(result).toBeInstanceOf(NumberStream);

  const decoratorFunction = assertStreamOperations(stream, result);

  expect(decoratorFunction(value)).toBe(output);
};
