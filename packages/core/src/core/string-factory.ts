import { AbstractFactory } from './abstract-factory';
import { Assert } from '../utils/assert';
import { MAX_STRING_LENGTH, MIN_STRING_LENGTH } from '../constants/limits';
import { Random } from './engine/random';

export class StringFactory extends AbstractFactory<string> {
  private readonly length: number;
  private readonly charset: string;

  public constructor(charset: string, length: number) {
    Assert.integer(length);
    Assert.inRange(length, MIN_STRING_LENGTH, MAX_STRING_LENGTH);
    Assert.nonEmptyString(charset);
    super();
    this.length = length;
    this.charset = charset;
  }

  public single(): string {
    return Random.string(this.charset, this.length);
  }
}
