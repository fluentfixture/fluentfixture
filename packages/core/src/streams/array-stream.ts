import { DEFAULT_ARRAY_SIZE, DEFAULT_SAMPLE_COUNT } from '../constants/limits';
import { MapFunction } from '../types/map-function';
import { FilterFunction } from '../types/filter-function';
import { SortFunction } from '../types/sort-function';
import { Iterator } from '../factories/decorators/iterator';
import { Functional } from '../factories/decorators/functional';
import { ValueAdapter } from '../factories/adapters/value-adapter';
import { Factory } from '../factories/factory';
import { Picker } from '../factories/decorators/picker';
import { Sampler } from '../factories/decorators/sampler';
import { Shuffler } from '../factories/decorators/shuffler';
import { Stream, StringStream } from './stream-loader';

export class ArrayStream<T = any> extends Stream<ReadonlyArray<T>> {

  public constructor(factory: Factory<ReadonlyArray<T>>) {
    super(factory);
  }

  public static iterate<T = any>(factory: Factory<T>, count: number = DEFAULT_ARRAY_SIZE): ArrayStream<T> {
    return new ArrayStream(new Iterator(factory, count));
  }

  public static fromList<T = any>(array: ReadonlyArray<T>): ArrayStream<T> {
    return new ArrayStream(new ValueAdapter(array));
  }

  public pick(): Stream<T> {
    return Stream.from(new Picker(this));
  }

  public join(separator?: string): StringStream {
    return new StringStream(new Functional(this, (arr) => arr.join(separator)));
  }

  public sample(size: number = DEFAULT_SAMPLE_COUNT): ArrayStream<T> {
    return new ArrayStream(new Sampler(this, size));
  }

  public shuffle(): ArrayStream<T> {
    return new ArrayStream(new Shuffler(this));
  }

  public sort(fn?: SortFunction<T>): ArrayStream<T> {
    return new ArrayStream(new Functional(this, (arr) => [...arr].sort(fn)));
  }

  public map<K>(fn: MapFunction<T, K>): ArrayStream<K> {
    return new ArrayStream(new Functional(this, (arr) => arr.map((e, i, a) => fn(e, i ,a))));
  }

  public filter(fn: FilterFunction<T>): ArrayStream<T> {
    return new ArrayStream(new Functional(this, (arr) => arr.filter((e, i, a) => fn(e, i ,a))));
  }
}
