import { Factory } from '../factory';

export class ValueAdapter<T = any> extends Factory<T> {
  private readonly value: T;

  public constructor(value: T) {
    super();
    this.value = value;
  }

  public single(): T {
    return this.value;
  }

  public getValue(): T {
    return this.value;
  }
}
