import { ProducerFunction } from '../../types/producer-function';
import { memo } from '../../utils/memo';
import { Factory } from '../factory';
import { Decorator } from './decorator';

export class Memo<T = any> extends Decorator<T, T> {
  private readonly memoized: ProducerFunction<T>;

  public constructor(factory: Factory<T>) {
    super(factory);
    this.memoized = memo(factory);
  }

  public single(): T {
    return this.memoized();
  }
}
