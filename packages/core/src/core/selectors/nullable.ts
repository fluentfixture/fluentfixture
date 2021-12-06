import { Selector } from './selector';
import { Factory } from '../factory';
import { ValueAdapter } from '../adapters/value-adapter';

export class Nullable<OUT> extends Selector<OUT, null> {

  public constructor(factory: Factory<OUT>, percentage: number) {
    super(factory, new ValueAdapter(null), percentage);
  }
}
