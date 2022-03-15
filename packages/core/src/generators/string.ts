import { DEFAULT_STRING_LENGTH } from '../constants/limits';
import { StringStream } from '../streams/stream-loader';

const generateStringStream = (charset: string, length: number): StringStream => StringStream.fromPatternAndLength(charset, length);

/**
 * Creates a `StringStream` that generates always the given string.
 * @see StringStream
 * @public
 * @param {string} [str] - the string to be generated
 * @returns {StringStream}
 */
export const text = (str: string): StringStream => StringStream.fromText(str);

/**
 * Creates a `StringStream` that generates an alphanumeric string with the given length.
 * @see StringStream
 * @public
 * @param {number} [length=10] - the length of the string to be generated
 * @returns {StringStream}
 */
export const str = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('alphanumeric', length);

/**
 * Creates a `StringStream` that generates a hexadecimal string with the given length.
 * @see StringStream
 * @public
 * @param {number} [length=10] - the length of the string to be generated
 * @returns {StringStream}
 */
export const hex = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('hex', length);

/**
 * Creates a `StringStream` that generates a binary string with the given length.
 * @see StringStream
 * @public
 * @param {number} [length=10] - the length of the string to be generated
 * @returns {StringStream}
 */
export const binary = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('binary', length);

/**
 * Creates a `StringStream` that generates an octal string with the given length.
 * @see StringStream
 * @public
 * @param {number} [length=10] - the length of the string to be generated
 * @returns {StringStream}
 */
export const octal = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('octal', length);

/**
 * Creates a `StringStream` that generates a numeric string with the given length.
 * @see StringStream
 * @public
 * @param {number} [length=10] - the length of the string to be generated
 * @returns {StringStream}
 */
export const numeric = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('numeric', length);

/**
 * Creates a `StringStream` that generates an alphabetic string with the given length.
 * @see StringStream
 * @public
 * @param {number} [length=10] - the length of the string to be generated
 * @returns {StringStream}
 */
export const alphabetic = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('alphabetic', length);

/**
 * Creates a `StringStream` that generates an alphanumeric string with the given length.
 * @see StringStream
 * @public
 * @param {number} [length=10] - the length of the string to be generated
 * @returns {StringStream}
 */
export const alphanumeric = (length: number = DEFAULT_STRING_LENGTH): StringStream => generateStringStream('alphanumeric', length);
