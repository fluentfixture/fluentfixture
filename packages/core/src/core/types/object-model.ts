import { Factory } from '../factory';

export type ObjectModel<OUT> = {
  [K in keyof OUT]: Factory<OUT[K]>
};
