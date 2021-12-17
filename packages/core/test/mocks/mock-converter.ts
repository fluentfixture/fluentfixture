import { Converter } from '../../src/core/converters/converter';
import { IFactory } from '../../src/core/interfaces/factory';

export class MockConverter<T = any, K = any> extends Converter<T, K> {
  private readonly value: K;

  public constructor(factory: IFactory<T>, value: K) {
    super(factory);
    this.value = value;
  }

  public single(): K {
    return this.value;
  }
}
