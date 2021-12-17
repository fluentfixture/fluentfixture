import { IFactory } from '../factories/interfaces/factory';
import { DEFAULT_ARRAY_SIZE } from '../constants/limits';
import { MapFunction } from '../types/map-function';
import { FilterFunction } from '../types/filter-function';
import { SortFunction } from '../types/sort-function';
import { Iterator } from '../factories/converters/iterator';
import { Picker } from '../factories/converters/picker';
import { Functional } from '../factories/converters/functional';
import { Shuffler } from '../factories/converters/shuffler';
import { Sampler } from '../factories/converters/sampler';
import { Stream } from './stream';
import { ValueStream } from './value-stream';

export class ArrayStream<T = any> extends Stream<ReadonlyArray<T>> {
  public constructor(factory: IFactory<ReadonlyArray<T>>) {
    super(factory);
  }

  public static of<T>(factory: IFactory<T>, count: number = DEFAULT_ARRAY_SIZE): ArrayStream<T> {
    return new ArrayStream(new Iterator(factory, count));
  }

  public pick(): ValueStream<T> {
    return ValueStream.from(new Picker(this));
  }

  public sample(size: number): ArrayStream<T> {
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
