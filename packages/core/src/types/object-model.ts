import { IFactory } from '../core/interfaces/factory';

export type ObjectModel<T> = {
  [K in keyof T]: IFactory<T[K]>
};
