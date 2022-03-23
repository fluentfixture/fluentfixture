import { Defaults } from './defaults';

/**
 * `Options` of formatter.
 * @interface
 */
export interface Options {
  /**
   * If set to false, it throws an error when an error occurs in the process;
   * otherwise, ignore errors and use default values. Default is true.
   */
  ignoreErrors?: boolean;

  /**
   * Default pipe names or pipe functions for each data types.
   */
  defaults?: Defaults;
}
