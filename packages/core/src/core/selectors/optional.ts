import { Selector } from './selector';
import { Factory } from '../factory';
import { ValueAdapter } from '../adapters/value-adapter';

export class Optional<T = any> extends Selector<T, undefined> {

  public constructor(factory: Factory<T>, percentage: number) {
    super(factory, new ValueAdapter(undefined), percentage);
  }
}
