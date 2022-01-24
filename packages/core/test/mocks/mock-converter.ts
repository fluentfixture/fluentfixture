import { Decorator } from '../../src/factories/decorators/decorator';
import { IFactory } from '../../src/factories/interfaces/factory';

export class MockConverter<T = any, K = any> extends Decorator<T, K> {
  private readonly value: K;

  public constructor(factory: IFactory<T>, value: K) {
    super(factory);
    this.value = value;
  }

  public single(): K {
    return this.value;
  }
}
