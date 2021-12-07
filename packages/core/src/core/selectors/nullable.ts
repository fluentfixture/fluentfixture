import { Selector } from './selector';
import { Factory } from '../factory';
import { ValueAdapter } from '../adapters/value-adapter';

export class Nullable<T> extends Selector<T, null> {

  public constructor(factory: Factory<T>, percentage: number) {
    super(factory, new ValueAdapter(null), percentage);
  }
}
