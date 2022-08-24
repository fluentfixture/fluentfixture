import { TypeUtils } from '@fluentfixture/shared';
import { Pipe } from './pipe';

export class Fallback<T = any> extends Pipe<T> {
  private readonly fallback: T;

  public constructor(fallback: T) {
    super();
    this.fallback = fallback;
  }

  public handle(input?: T): T {
    return TypeUtils.isAssigned(input) ? input : this.fallback;
  }
}
