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
  public constructor(factory: IFactory<string>) {
    super(factory);
  }

  public static fromText(text: string): StringStream {
    return new StringStream(new ValueAdapter(text));
  }

  public static fromPatternAndLength(pattern: string, length: number): StringStream {
    return new StringStream(new StringFactory(pattern, length));
  }

  public trim(): StringStream {
    return this.apply((i) => i.trim());
  }

  public trimStart(): StringStream {
    return this.apply((i) => i.trimStart());
  }

  public trimEnd(): StringStream {
    return this.apply((i) => i.trimEnd());
  }

  public padStart(length: number, char?: string): StringStream {
    return this.apply((i) => i.padStart(length, char));
  }

  public padEnd(length: number, char?: string): StringStream {
    return this.apply((i) => i.padEnd(length, char));
  }

  public lowerCase(): StringStream {
    return this.apply((i) => i.toLowerCase());
  }

  public upperCase(): StringStream {
    return this.apply((i) => i.toUpperCase());
  }

  public camelCase(): StringStream {
    return this.apply((i) => StringUtils.camelCase(i));
  }

  public capitalCase(): StringStream {
    return this.apply((i) => StringUtils.capitalCase(i));
  }

  public constantCase(): StringStream {
    return this.apply((i) => StringUtils.constantCase(i));
  }

  public pathCase(): StringStream {
    return this.apply((i) => StringUtils.pathCase(i));
  }

  public dotCase(): StringStream {
    return this.apply((i) => StringUtils.dotCase(i));
  }

  public headerCase(): StringStream {
    return this.apply((i) => StringUtils.headerCase(i));
  }

  public paramCase(): StringStream {
    return this.apply((i) => StringUtils.paramCase(i));
  }

  public pascalCase(): StringStream {
    return this.apply((i) => StringUtils.pascalCase(i));
  }

  public snakeCase(): StringStream {
    return this.apply((i) => StringUtils.snakeCase(i));
  }
}
