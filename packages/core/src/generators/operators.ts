import { Stream } from '../streams/stream-loader';
import { DEFAULT_PERCENTAGE } from '../constants/limits';
import { Selector } from '../factories/selectors/selector';
import { Factory } from '../factories/factory';

export const or = <T, K>(left: Factory<T>, right: Factory<K>, percentage: number = DEFAULT_PERCENTAGE): Stream<T | K> =>
  Stream.from(new Selector(left, right, percentage));
