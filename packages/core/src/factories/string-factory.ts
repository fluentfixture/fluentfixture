import { Assert } from '../utils/assert';
import { MAX_STRING_LENGTH, MIN_STRING_LENGTH } from '../constants/limits';
import { Random } from '../engine/random';
import { Factory } from './factory';

/**
 * `StringFactory` generates a `string` by using the given charset and length.
 * @see Factory
 * @class
 * @extends {Factory.<string>}
 */
export class StringFactory extends Factory<string> {
  private readonly length: number;
  private readonly charset: string;

  /**
   * Creates an instance of `StringFactory`.
   * @constructor
   * @param {string} [charset] - the charset of the string to be generated
   * @param {number} [length] - the length of the string to be generated
   */
  public constructor(charset: string, length: number) {
    Assert.isInteger('StringFactory.constructor(charset, length)', 'length', length);
    Assert.isInRange('StringFactory.constructor(charset, length)', 'length', length, MIN_STRING_LENGTH, MAX_STRING_LENGTH);
    Assert.isNonEmptyString('StringFactory.constructor(charset, length)', 'charset', charset);
    super();
    this.length = length;
    this.charset = charset;
  }

  /**
   * Generates single string.
   * @public
   * @returns {string}
   */
  public single(): string {
    return Random.string(this.charset, this.length);
  }

  /**
   * Returns the charset.
   * @public
   * @returns {string}
   */
  public getCharset(): string {
    return this.charset;
  }

  /**
   * Returns the length.
   * @public
   * @returns {number}
   */
  public getLength(): number {
    return this.length;
  }
}
