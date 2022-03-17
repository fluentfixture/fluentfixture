import { Generator } from '../../src/generators/generator';

export class MockGenerator extends Generator {
  private readonly value?: any;

  public constructor(value?: any) {
    super();
    this.value = value;
  }

  public process(): any {
    throw new Error('Not implemented');
  }

  public getValue(): any {
    return this.value;
  }
}
