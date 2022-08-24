import { Pipe } from './pipe';

export class Noop<T = any> extends Pipe<T, T> {
  private static singletonInstance: Noop;

  private constructor() {
    super();
  }

  public static instance(): Noop {
    return Noop.singletonInstance || (Noop.singletonInstance = new Noop());
  }

  public handle(input: T): T {
    return input;
  }
}
