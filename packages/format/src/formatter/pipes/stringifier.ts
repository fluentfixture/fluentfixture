import { TypeUtils } from '@fluentfixture/shared';
import { Pipe } from './pipe';

export class Stringifier<T = any> extends Pipe<T, string> {
  private static singletonInstance: Stringifier;

  private constructor() {
    super();
  }

  public static instance(): Stringifier {
    return Stringifier.singletonInstance || (Stringifier.singletonInstance = new Stringifier());
  }

  public handle(input: T): string {
    return TypeUtils.isString(input) ? input : TypeUtils.isAssigned(input) ? String(input) : '';
  }
}
