import { Pipe } from './pipe';

export class Constant<T = any> extends Pipe<T, T> {
  private readonly value: T;

  public constructor(value: T) {
    super();
    this.value = value;
  }

  public handle(): T {
    return this.value;
  }

  public getValue(): T {
    return this.value;
  }
}
