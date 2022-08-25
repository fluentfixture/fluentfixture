import { StringUtils } from '@fluentfixture/shared';
import { StringFactory } from '../factories/string-factory';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { Factory } from '../factories/factory';
import { Functional } from '../factories/decorators/functional';
import { ArrayStream, Stream } from './stream-loader';

export class StringStream extends Stream<string> {

  public constructor(factory: Factory<string>) {
    super(factory);
  }

  public static fromText(str: string): StringStream {
    return new StringStream(new ValueAdapter(str));
  }

  public static fromPatternAndLength(pattern: string, length: number): StringStream {
    return new StringStream(new StringFactory(pattern, length));
  }

  public trim(): StringStream {
    return this.apply((i) => StringUtils.trim(i));
  }

  public trimStart(): StringStream {
    return this.apply((i) => StringUtils.trimStart(i));
  }

  public trimEnd(): StringStream {
    return this.apply((i) => StringUtils.trimEnd(i));
  }

  public padStart(length: number, str?: string): StringStream {
    return this.apply((i) => StringUtils.padStart(i, length, str));
  }

  public padEnd(length: number, str?: string): StringStream {
    return this.apply((i) => StringUtils.padEnd(i, length, str));
  }

  public split(separator: string | RegExp, limit?: number): ArrayStream<string> {
    return new ArrayStream<string>(new Functional(this, (i) => StringUtils.split(i, separator, limit)));
  }

  public lowerCase(): StringStream {
    return this.apply((i) => StringUtils.lowerCase(i));
  }

  public upperCase(): StringStream {
    return this.apply((i) => StringUtils.upperCase(i));
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
