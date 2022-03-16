import { StringUtils } from '@fluentfixture/shared';
import { StringFactory } from '../factories/string-factory';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { Factory } from '../factories/factory';
import { Stream } from './stream-loader';

/**
 * `StringStream` extends the `Stream.<string>` class for object operations.
 * @see Stream
 * @class
 * @extends Stream.<string>`
 */
export class StringStream extends Stream<string> {

  /**
   * Creates an instance of `StringStream`.
   * @constructor
   * @param {Factory.<string>} [factory] - the factory to be decorated
   */
  public constructor(factory: Factory<string>) {
    super(factory);
  }

  /**
   * Creates a `StringStream` with `ValueAdapter` adapter and the given string, which means it always generates the given string.
   * @see ValueAdapter
   * @static
   * @public
   * @param {string} [str] - the string to be generated
   * @returns {StringStream}
   */
  public static fromText(str: string): StringStream {
    return new StringStream(new ValueAdapter(str));
  }

  /**
   * Creates a `StringStream` with `StringFactory`, the given pattern and length.
   * @static
   * @public
   * @param {string} [pattern] - the pattern of the string to be generated
   * @param {number} [length] - the length of the string to be generated
   * @returns {StringStream}
   */
  public static fromPatternAndLength(pattern: string, length: number): StringStream {
    return new StringStream(new StringFactory(pattern, length));
  }

  /**
   * Creates a `StringStream` with `Functional` decorator and the `trim` operator.
   * @see Functional
   * @public
   * @returns {StringStream}
   */
  public trim(): StringStream {
    return this.apply((i) => StringUtils.trim(i));
  }

  /**
   * Creates a `StringStream` with `Functional` decorator and the `trim-start` operator.
   * @see Functional
   * @public
   * @returns {StringStream}
   */
  public trimStart(): StringStream {
    return this.apply((i) => StringUtils.trimStart(i));
  }

  /**
   * Creates a `StringStream` with `Functional` decorator and the `trim-end` operator.
   * @see Functional
   * @public
   * @returns {StringStream}
   */
  public trimEnd(): StringStream {
    return this.apply((i) => StringUtils.trimEnd(i));
  }

  /**
   * Creates a `StringStream` with `Functional` decorator and the `pad-start` operator.
   * @see Functional
   * @public
   * @param {number} [length] - the target length of the string
   * @param {string} [str=space] - the pad string
   * @returns {StringStream}
   */
  public padStart(length: number, str?: string): StringStream {
    return this.apply((i) => StringUtils.padStart(i, length, str));
  }

  /**
   * Creates a `StringStream` with `Functional` decorator and the `pad-end` operator.
   * @see Functional
   * @public
   * @param {number} [length] - the target length of the string
   * @param {string} [str=space] - the pad string
   * @returns {StringStream}
   */
  public padEnd(length: number, str?: string): StringStream {
    return this.apply((i) => StringUtils.padEnd(i, length, str));
  }

  /**
   * Creates a `StringStream` with `Functional` decorator and the `lower-case` operator.
   * @see Functional
   * @public
   * @returns {StringStream}
   */
  public lowerCase(): StringStream {
    return this.apply((i) => StringUtils.lowerCase(i));
  }

  /**
   * Creates a `StringStream` with `Functional` decorator and the `upper-case` operator.
   * @see Functional
   * @public
   * @returns {StringStream}
   */
  public upperCase(): StringStream {
    return this.apply((i) => StringUtils.upperCase(i));
  }

  /**
   * Creates a `StringStream` with `Functional` decorator and the `camel-case` operator.
   * @see Functional
   * @public
   * @returns {StringStream}
   */
  public camelCase(): StringStream {
    return this.apply((i) => StringUtils.camelCase(i));
  }

  /**
   * Creates a `StringStream` with `Functional` decorator and the `capital-case` operator.
   * @see Functional
   * @public
   * @returns {StringStream}
   */
  public capitalCase(): StringStream {
    return this.apply((i) => StringUtils.capitalCase(i));
  }

  /**
   * Creates a `StringStream` with `Functional` decorator and the `constant-case` operator.
   * @see Functional
   * @public
   * @returns {StringStream}
   */
  public constantCase(): StringStream {
    return this.apply((i) => StringUtils.constantCase(i));
  }

  /**
   * Creates a `StringStream` with `Functional` decorator and the `path-case` operator.
   * @see Functional
   * @public
   * @returns {StringStream}
   */
  public pathCase(): StringStream {
    return this.apply((i) => StringUtils.pathCase(i));
  }

  /**
   * Creates a `StringStream` with `Functional` decorator and the `dot-case` operator.
   * @see Functional
   * @public
   * @returns {StringStream}
   */
  public dotCase(): StringStream {
    return this.apply((i) => StringUtils.dotCase(i));
  }

  /**
   * Creates a `StringStream` with `Functional` decorator and the `header-case` operator.
   * @see Functional
   * @public
   * @returns {StringStream}
   */
  public headerCase(): StringStream {
    return this.apply((i) => StringUtils.headerCase(i));
  }

  /**
   * Creates a `StringStream` with `Functional` decorator and the `param-case` operator.
   * @see Functional
   * @public
   * @returns {StringStream}
   */
  public paramCase(): StringStream {
    return this.apply((i) => StringUtils.paramCase(i));
  }

  /**
   * Creates a `StringStream` with `Functional` decorator and the `pascal-case` operator.
   * @see Functional
   * @public
   * @returns {StringStream}
   */
  public pascalCase(): StringStream {
    return this.apply((i) => StringUtils.pascalCase(i));
  }

  /**
   * Creates a `StringStream` with `Functional` decorator and the `snake-case` operator.
   * @see Functional
   * @public
   * @returns {StringStream}
   */
  public snakeCase(): StringStream {
    return this.apply((i) => StringUtils.snakeCase(i));
  }
}
