import { Random, TypeUtils } from '@fluentfixture/shared';
import { DEFAULT_STRING_LENGTH } from '../constants/limits';
import { StringStream } from '../streams/stream-loader';
import { asString } from './converters';
import { from } from './value';

const ALPHABET: string = 'abcdefghijklmnopqrstuvwxyz';
const BINARY_CHAR_POOL: string = '01';
const OCTAL_CHAR_POOL: string = '01234567';
const NUMERIC_CHAR_POOL: string = '0123456789';
const ALPHABETIC_CHAR_POOL: string = ALPHABET + ALPHABET.toUpperCase();
const ALPHA_NUMERIC_CHAR_POOL: string = ALPHABETIC_CHAR_POOL + NUMERIC_CHAR_POOL;
const HEX_CHAR_POOL: string = 'abcdef' + NUMERIC_CHAR_POOL;

const UUID4 = asString(from(() => Random.uuid4()));

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
  createStream(HEX_CHAR_POOL, minLength, maxLength);

export const binary = (minLength: number = DEFAULT_STRING_LENGTH, maxLength?: number): StringStream =>
  createStream(BINARY_CHAR_POOL, minLength, maxLength);

export const octal = (minLength: number = DEFAULT_STRING_LENGTH, maxLength?: number): StringStream =>
  createStream(OCTAL_CHAR_POOL, minLength, maxLength);

export const numeric = (minLength: number = DEFAULT_STRING_LENGTH, maxLength?: number): StringStream =>
  createStream(NUMERIC_CHAR_POOL, minLength, maxLength);

export const alphabetic = (minLength: number = DEFAULT_STRING_LENGTH, maxLength?: number): StringStream =>
  createStream(ALPHABETIC_CHAR_POOL, minLength, maxLength);

export const alphanumeric = (minLength: number = DEFAULT_STRING_LENGTH, maxLength?: number): StringStream =>
  createStream(ALPHA_NUMERIC_CHAR_POOL, minLength, maxLength);

export const uuid4 = (): StringStream => UUID4;
