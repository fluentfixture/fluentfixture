import { AbstractFactory } from '../../src/core/abstract-factory';

export class MockFactory extends AbstractFactory {
  private readonly value: any;

  public constructor(value: any) {
    super();
    this.value = value;
  }

  public single(): any {
    return this.value;
  }
}
