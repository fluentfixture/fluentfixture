import { Pipe } from './pipe';

export class Noop<T = any> extends Pipe<T, T> {

  public handle(input: T): T {
    return input;
  }
}
