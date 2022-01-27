import { Factory } from '../factories/factory';

export type ObjectModel<T> = {
  [K in keyof T]: Factory<T[K]>
};
