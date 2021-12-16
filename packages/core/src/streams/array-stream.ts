import { Factory } from '../core/factory';
import { Iterator } from '../core/collectios/iterator';
import { Stream } from './stream';
import { ValueStream } from './value-stream';
import { Picker } from '../core/collectios/picker';
import { DEFAULT_ARRAY_SIZE } from '../constants/limits';
import { Sampler } from '../core/collectios/sampler';
import { MapFunction } from '../core/types/map-function';
import { FactoryDecorator } from '../core/decorators/factory-decorator';
import { FilterFunction } from '../core/types/filter-function';
import { Shuffler } from '../core/collectios/shuffler';
import { SortFunction } from '../core/types/sort-function';

export class ArrayStream<T = any> extends Stream<ReadonlyArray<T>> {
  public constructor(factory: Factory<ReadonlyArray<T>>) {
    super(factory);
  }

  public static of<T>(factory: Factory<T>, count: number = DEFAULT_ARRAY_SIZE): ArrayStream<T> {
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
    return new ArrayStream(new FactoryDecorator(this, (arr) => [...arr].sort(fn)));
  }

  public map<K>(fn: MapFunction<T, K>): ArrayStream<K> {
    return new ArrayStream(new FactoryDecorator(this, (arr) => arr.map((e, i, a) => fn(e, i ,a))));
  }

  public filter(fn: FilterFunction<T>): ArrayStream<T> {
    return new ArrayStream(new FactoryDecorator(this, (arr) => arr.filter((e, i, a) => fn(e, i ,a))));
  }
}
