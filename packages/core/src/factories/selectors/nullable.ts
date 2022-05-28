import { ValueAdapter } from '../adapters/value-adapter';
import { Factory } from '../factory';
import { Selector } from './selector';

export class Nullable<T = any> extends Selector<T, null> {

  public constructor(factory: Factory<T>, percentage: number) {
    super(factory, new ValueAdapter(null), percentage);
  }
}
