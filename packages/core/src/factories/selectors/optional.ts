import { IFactory } from '../interfaces/factory';
import { ValueAdapter } from '../adapters/value-adapter';
import { Selector } from './selector';

export class Optional<T = any> extends Selector<T, undefined> {

  public constructor(factory: IFactory<T>, percentage: number) {
    super(factory, new ValueAdapter(undefined), percentage);
  }
}
