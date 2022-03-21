import { Pipe } from '../../src/pipes/pipe';

export class MockPipe extends Pipe {
  private readonly value?: any;

  public constructor(value?: any) {
    super();
    this.value = value;
  }

  public handle(): any {
    throw new Error('Not implemented');
  }

  public getValue(): any {
    return this.value;
  }
}
