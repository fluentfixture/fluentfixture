import { Factory } from '../../src/factories/factory';

export class MockFactory<T = any> extends Factory<T> {
  private readonly value: T;

  public constructor(value: T) {
    super();
    this.value = value;
  }

  public single(): T {
    return this.value;
  }
}
