import { ValueAdapter } from '../adapters/value-adapter';
import { Factory } from '../factory';
import { Selector } from './selector';

export class Optional<T = any> extends Selector<T, undefined> {

  public constructor(factory: Factory<T>, percentage: number) {
    super(factory, new ValueAdapter(undefined), percentage);
  }
}
