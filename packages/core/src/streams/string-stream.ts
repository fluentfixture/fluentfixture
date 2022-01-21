import { IFactory } from '../factories/interfaces/factory';
import { StringFactory } from '../factories/string-factory';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { StringUtils } from '../utils/string-utils';
import { Stream } from './stream-loader';

/**
 * `StringStream` extends the `Stream.<string>` class for object operations.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/string-stream|Docs}
 * @see Stream
 * @class
 * @extends Stream.<string>
 */
export class StringStream extends Stream<string> {

  /**
   * Creates an instance of `StringStream`.
   * @constructor
   * @param {IFactory.<string>} [factory] - the factory to be decorated
   */
  public constructor(factory: IFactory<string>) {
    super(factory);
  }

  /**
   * Creates a `StringStream` that generates always the given string.
   * @static
   * @param {string} [str] - the string to be generated
   * @returns {StringStream}
   */
  public static fromText(str: string): StringStream {
    return new StringStream(new ValueAdapter(str));
  }

  /**
   * Creates a `StringStream` that generates a stream with the given pattern and length.
   * @static
   * @param {string} [pattern] - the pattern of the string to be generated
   * @param {number} [length] - the length of the string to be generated
   * @returns {StringStream}
   */
  public static fromPatternAndLength(pattern: string, length: number): StringStream {
    return new StringStream(new StringFactory(pattern, length));
  }

  /**
   * Creates a `StringStream` with a `Functional` decorator and the trim operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/string-stream#trim|Docs}
   * @see Functional
   * @returns {StringStream}
   */
  public trim(): StringStream {
    return this.apply((i) => i.trim());
  }

  /**
   * Creates a `StringStream` with a `Functional` decorator and the trim-start operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/string-stream#trimstart|Docs}
   * @see Functional
   * @returns {StringStream}
   */
  public trimStart(): StringStream {
    return this.apply((i) => i.trimStart());
  }

  /**
   * Creates a `StringStream` with a `Functional` decorator and the trim-end operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/string-stream#trimend|Docs}
   * @see Functional
   * @returns {StringStream}
   */
  public trimEnd(): StringStream {
    return this.apply((i) => i.trimEnd());
  }

  /**
   * Creates a `StringStream` with a `Functional` decorator and the pad-start operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/string-stream#padstart-length-str|Docs}
   * @see Functional
   * @param {number} [length] - the target length of the string
   * @param {string} [str=space] - the pad string
   * @returns {StringStream}
   */
  public padStart(length: number, str?: string): StringStream {
    return this.apply((i) => i.padStart(length, str));
  }

  /**
   * Creates a `StringStream` with a `Functional` decorator and the pad-end operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/string-stream#padend-length-str|Docs}
   * @see Functional
   * @param {number} [length] - the target length of the string
   * @param {string} [str=space] - the pad string
   * @returns {StringStream}
   */
  public padEnd(length: number, str?: string): StringStream {
    return this.apply((i) => i.padEnd(length, str));
  }

  /**
   * Creates a `StringStream` with a `Functional` decorator and the lower-case operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/string-stream#lowercase|Docs}
   * @see Functional
   * @returns {StringStream}
   */
  public lowerCase(): StringStream {
    return this.apply((i) => i.toLowerCase());
  }

  /**
   * Creates a `StringStream` with a `Functional` decorator and the upper-case operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/string-stream#uppercase|Docs}
   * @see Functional
   * @returns {StringStream}
   */
  public upperCase(): StringStream {
    return this.apply((i) => i.toUpperCase());
  }

  /**
   * Creates a `StringStream` with a `Functional` decorator and the camel-case operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/string-stream#camelcase|Docs}
   * @see Functional
   * @returns {StringStream}
   */
  public camelCase(): StringStream {
    return this.apply((i) => StringUtils.camelCase(i));
  }

  /**
   * Creates a `StringStream` with a `Functional` decorator and the capital-case operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/string-stream#capitalcase|Docs}
   * @see Functional
   * @returns {StringStream}
   */
  public capitalCase(): StringStream {
    return this.apply((i) => StringUtils.capitalCase(i));
  }

  /**
   * Creates a `StringStream` with a `Functional` decorator and the constant-case operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/string-stream#constantcase|Docs}
   * @see Functional
   * @returns {StringStream}
   */
  public constantCase(): StringStream {
    return this.apply((i) => StringUtils.constantCase(i));
  }

  /**
   * Creates a `StringStream` with a `Functional` decorator and the path-case operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/string-stream#pathcase|Docs}
   * @see Functional
   * @returns {StringStream}
   */
  public pathCase(): StringStream {
    return this.apply((i) => StringUtils.pathCase(i));
  }

  /**
   * Creates a `StringStream` with a `Functional` decorator and the dot-case operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/string-stream#dotcase|Docs}
   * @see Functional
   * @returns {StringStream}
   */
  public dotCase(): StringStream {
    return this.apply((i) => StringUtils.dotCase(i));
  }

  /**
   * Creates a `StringStream` with a `Functional` decorator and the header-case operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/string-stream#headercase|Docs}
   * @see Functional
   * @returns {StringStream}
   */
  public headerCase(): StringStream {
    return this.apply((i) => StringUtils.headerCase(i));
  }

  /**
   * Creates a `StringStream` with a `Functional` decorator and the param-case operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/string-stream#paramcase|Docs}
   * @see Functional
   * @returns {StringStream}
   */
  public paramCase(): StringStream {
    return this.apply((i) => StringUtils.paramCase(i));
  }

  /**
   * Creates a `StringStream` with a `Functional` decorator and the pascal-case operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/string-stream#pascalcase|Docs}
   * @see Functional
   * @returns {StringStream}
   */
  public pascalCase(): StringStream {
    return this.apply((i) => StringUtils.pascalCase(i));
  }

  /**
   * Creates a `StringStream` with a `Functional` decorator and the snake-case operator.
   * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/streams/string-stream#snakecase|Docs}
   * @see Functional
   * @returns {StringStream}
   */
  public snakeCase(): StringStream {
    return this.apply((i) => StringUtils.snakeCase(i));
  }
}
