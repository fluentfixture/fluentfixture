import { ProducerFunction } from '../types/producer-function';
import { Factory } from '../factories/factory';

export const memo = <T>(factory: Factory<T>): ProducerFunction<T> => {
  let value: T;
  let done = false;
  return (): T => {
    if (done) {
      return value;
    }
    done = true;
    return (value = factory.single());
  };
};
