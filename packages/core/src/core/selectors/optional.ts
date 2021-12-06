import { Selector } from './selector';
import { Factory } from '../factory';
import { ValueAdapter } from '../adapters/value-adapter';

export class Optional<OUT> extends Selector<OUT, undefined> {

  public constructor(factory: Factory<OUT>, percentage: number) {
    super(factory, new ValueAdapter(undefined), percentage);
  }
}
