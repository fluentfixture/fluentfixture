import { Random } from '@fluentfixture/shared';
import { Assert } from '../assertions/assert';
import { MAX_STRING_LENGTH, MIN_STRING_LENGTH } from '../constants/limits';
import { Factory } from './factory';

export class StringFactory extends Factory<string> {
  private readonly pool: string;
  private readonly minLength: number;
  private readonly maxLength: number;

  public constructor(pool: string, minLength: number, maxLength: number) {
    Assert.isInteger('StringFactory.constructor(pool, minLength, maxLength)', 'minLength', minLength);
    Assert.isInRange('StringFactory.constructor(pool, minLength, maxLength)', 'minLength', minLength, MIN_STRING_LENGTH, MAX_STRING_LENGTH);
    Assert.isInteger('StringFactory.constructor(pool, minLength, maxLength)', 'maxLength', maxLength);
    Assert.isInRange('StringFactory.constructor(pool, minLength, maxLength)', 'maxLength', maxLength, MIN_STRING_LENGTH, MAX_STRING_LENGTH);
    Assert.isNonEmptyString('StringFactory.constructor(pool, minLength, maxLength)', 'pool', pool);
    super();
    this.pool = pool;
    this.minLength = minLength;
    this.maxLength = maxLength;
  }

  public single(): string {
    return Random.string(this.pool, this.minLength, this.maxLength);
  }

  public getPool(): string {
    return this.pool;
  }

  public getMinLength(): number {
    return this.minLength;
  }

  public getMaxLength(): number {
    return this.maxLength;
  }
}
