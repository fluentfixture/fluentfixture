import { Assert } from '../assertions/assert';
import { MAX_STRING_LENGTH, MIN_STRING_LENGTH } from '../constants/limits';
import { Random } from '../engine/random';
import { Factory } from './factory';

export class StringFactory extends Factory<string> {
  private readonly charset: string;
  private readonly minLength: number;
  private readonly maxLength: number;

  public constructor(charset: string, minLength: number, maxLength: number) {
    Assert.isInteger('StringFactory.constructor(charset, minLength, maxLength)', 'minLength', minLength);
    Assert.isInRange('StringFactory.constructor(charset, minLength, maxLength)', 'minLength', minLength, MIN_STRING_LENGTH, MAX_STRING_LENGTH);
    Assert.isInteger('StringFactory.constructor(charset, minLength, maxLength)', 'maxLength', maxLength);
    Assert.isInRange('StringFactory.constructor(charset, minLength, maxLength)', 'maxLength', maxLength, MIN_STRING_LENGTH, MAX_STRING_LENGTH);
    Assert.isNonEmptyString('StringFactory.constructor(charset, minLength, maxLength)', 'charset', charset);
    super();
    this.charset = charset;
    this.minLength = minLength;
    this.maxLength = maxLength;
  }

  public single(): string {
    return Random.string(this.charset, this.minLength, this.maxLength);
  }

  public getCharset(): string {
    return this.charset;
  }

  public getMinLength(): number {
    return this.minLength;
  }

  public getMaxLength(): number {
    return this.maxLength;
  }
}
