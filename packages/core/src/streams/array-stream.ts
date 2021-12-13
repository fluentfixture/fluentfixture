import { Factory } from '../core/factory';
import { Iterator } from '../core/collectios/iterator';
import { Stream } from './stream';
import { ValueStream } from './value-stream';
import { Picker } from '../core/collectios/picker';
import { DEFAULT_ARRAY_SIZE } from '../constants/limits';
import { Sampler } from '../core/collectios/sampler';

export class ArrayStream<T = any> extends Stream<ReadonlyArray<T>> {
  public constructor(factory: Factory<ReadonlyArray<T>>) {
    super(factory);
  }

  public static of<T>(factory: Factory<T>, count: number = DEFAULT_ARRAY_SIZE): ArrayStream<T> {
    return new ArrayStream<T>(new Iterator(factory, count));
  }

  public pick(): ValueStream<T> {
    return ValueStream.from(new Picker(this));
  }

  public sample(size: number): ArrayStream<T> {
    return new ArrayStream<T>(new Sampler(this, size));
  }
}
