import { IFactory } from '../factories/interfaces/factory';
import { ProducerFunction } from '../types/producer-function';

export const memo = <T>(factory: IFactory<T>): ProducerFunction<T> => {
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
