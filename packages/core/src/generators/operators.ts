import { Stream } from '../streams/stream-loader';
import { IFactory } from '../factories/interfaces/factory';
import { DEFAULT_PERCENTAGE } from '../constants/limits';
import { Selector } from '../factories/selectors/selector';

export const or = <T, K>(left: IFactory<T>, right: IFactory<K>, percentage: number = DEFAULT_PERCENTAGE): Stream<T | K> =>
  Stream.from(new Selector(left, right, percentage));
