import { AbstractFactory } from '../abstract-factory';

export class ValueAdapter<OUT> extends AbstractFactory<OUT> {
  private readonly value: OUT;

  public constructor(value: OUT) {
    super();
    this.value = value;
  }

  public single(): OUT {
    return this.value;
  }
}
