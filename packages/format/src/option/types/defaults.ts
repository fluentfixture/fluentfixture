import { DefaultPipe } from './default-pipe';

/**
 * `Defaults` options of formatter.
 * @interface
 */
export interface Defaults {
  /**
   * Default date pipe name or function for dates.
   */
  date: DefaultPipe<Date>
}
