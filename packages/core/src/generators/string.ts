import { DEFAULT_STRING_LENGTH } from '../constants/limits';
import { StringStream } from '../streams/stream-loader';
import { Random } from '../engine/random';
import { asString } from './converters';
import { from } from './value';

const generateStringStream = (charset: string, length: number): StringStream => StringStream.fromPatternAndLength(charset, length);

export const text = (str: string): StringStream => StringStream.fromText(str);

export const str = (charset: string, length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream(charset, length);

export const hex = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('hex', length);

export const binary = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('binary', length);

export const octal = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('octal', length);

export const numeric = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('numeric', length);

export const alphabetic = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('alphabetic', length);

export const alphanumeric = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('alphanumeric', length);

const UUID4 = asString(from(() => Random.uuid4()));

export const uuid4 = (): StringStream => UUID4;
