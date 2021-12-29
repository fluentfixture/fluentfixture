import {
  capitalCase,
  camelCase,
  constantCase,
  dotCase,
  headerCase,
  paramCase,
  pascalCase,
  snakeCase,
} from 'change-case';
import { IFactory } from '../factories/interfaces/factory';
import { ConvertFunction } from '../types/convert-function';
import { Functional } from '../factories/converters/functional';
import { Stream } from './stream-loader';

export class StringStream extends Stream<string> {
  public constructor(factory: IFactory<string>) {
    super(factory);
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

  public lowerCase(): StringStream {
    return this.apply((i) => i.toLowerCase());
  }

  public upperCase(): StringStream {
    return this.apply((i) => i.toUpperCase());
  }

  public camelCase(): StringStream {
    return this.apply((i) => camelCase(i));
  }

  public capitalCase(): StringStream {
    return this.apply((i) => capitalCase(i));
  }

  public constantCase(): StringStream {
    return this.apply((i) => constantCase(i));
  }

  public dotCase(): StringStream {
    return this.apply((i) => dotCase(i));
  }

  public headerCase(): StringStream {
    return this.apply((i) => headerCase(i));
  }

  public paramCase(): StringStream {
    return this.apply((i) => paramCase(i));
  }

  public pascalCase(): StringStream {
    return this.apply((i) => pascalCase(i));
  }

  public snakeCase(): StringStream {
    return this.apply((i) => snakeCase(i));
  }

  private apply(fn: ConvertFunction<string, string>): StringStream {
    return new StringStream(new Functional(this, fn));
  }
}