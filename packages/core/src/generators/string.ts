import { TypeUtils } from '@fluentfixture/shared';
import { DEFAULT_STRING_LENGTH } from '../constants/limits';
import { StringStream } from '../streams/stream-loader';
import { Random } from '../engine/random';
import { asString } from './converters';
import { from } from './value';

const getRange = (minLength: number, maxLength?: number): [number, number] => {
  if (TypeUtils.isAssigned(maxLength)) {
    return minLength <= maxLength ? [minLength, maxLength] : [maxLength, minLength]
  }
  return [minLength, minLength];
};

const createStream = (charset: string, minLength: number, maxLength?: number): StringStream => {
  const range = getRange(minLength, maxLength);
  return StringStream.fromPatternAndLength(charset, range[0], range[1]);
};

export const text = (str: string): StringStream =>
  StringStream.fromText(str);

export const str = (charset: string, minLength: number = DEFAULT_STRING_LENGTH, maxLength?: number): StringStream =>
  createStream(charset, minLength, maxLength);

export const hex = (minLength: number = DEFAULT_STRING_LENGTH, maxLength?: number): StringStream =>
  createStream('hex', minLength, maxLength);

export const binary = (minLength: number = DEFAULT_STRING_LENGTH, maxLength?: number): StringStream =>
  createStream('binary', minLength, maxLength);

export const octal = (minLength: number = DEFAULT_STRING_LENGTH, maxLength?: number): StringStream =>
  createStream('octal', minLength, maxLength);

export const numeric = (minLength: number = DEFAULT_STRING_LENGTH, maxLength?: number): StringStream =>
  createStream('numeric', minLength, maxLength);

export const alphabetic = (minLength: number = DEFAULT_STRING_LENGTH, maxLength?: number): StringStream =>
  createStream('alphabetic', minLength, maxLength);

export const alphanumeric = (minLength: number = DEFAULT_STRING_LENGTH, maxLength?: number): StringStream =>
  createStream('alphanumeric', minLength, maxLength);

const UUID4 = asString(from(() => Random.uuid4()));

export const uuid4 = (): StringStream => UUID4;
