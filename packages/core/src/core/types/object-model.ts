import { Factory } from '../factory';

export type ObjectModel<T> = {
  [K in keyof T]: Factory<T[K]>
};
