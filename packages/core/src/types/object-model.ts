import { IFactory } from '../factories/interfaces/factory';

export type ObjectModel<T> = {
  [K in keyof T]: IFactory<T[K]>
};
