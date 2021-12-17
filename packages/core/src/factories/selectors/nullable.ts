import { IFactory } from '../interfaces/factory';
import { ValueAdapter } from '../adapters/value-adapter';
import { Selector } from './selector';

export class Nullable<T = any> extends Selector<T, null> {

  public constructor(factory: IFactory<T>, percentage: number) {
    super(factory, new ValueAdapter(null), percentage);
  }
}
