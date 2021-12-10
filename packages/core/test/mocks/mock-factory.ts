import { AbstractFactory } from '../../src/core/abstract-factory';

export class MockFactory<T = any> extends AbstractFactory<T> {
  private readonly value: T;

  public constructor(value: T) {
    super();
    this.value = value;
  }

  public single(): T {
    return this.value;
  }
}
