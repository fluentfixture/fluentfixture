import { IFactory } from '../interfaces/factory';
import { ProducerFunction } from '../../types/producer-function';
import { memo } from '../../utils/memo';
import { Converter } from './converter';

export class Memo<T = any> extends Converter<T, T> {
  private readonly memoized: ProducerFunction<T>;

  public constructor(factory: IFactory<T>) {
    super(factory);
    this.memoized = memo(factory);
  }

  public single(): T {
    return this.memoized();
  }
}
