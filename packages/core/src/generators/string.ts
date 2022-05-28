import { DEFAULT_STRING_LENGTH } from '../constants/limits';
import { StringStream } from '../streams/stream-loader';

const generateStringStream = (charset: string, length: number): StringStream => StringStream.fromPatternAndLength(charset, length);

export const text = (str: string): StringStream => StringStream.fromText(str);

export const str = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('alphanumeric', length);

export const hex = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('hex', length);

export const binary = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('binary', length);

export const octal = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('octal', length);

export const numeric = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('numeric', length);

export const alphabetic = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('alphabetic', length);

export const alphanumeric = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('alphanumeric', length);
