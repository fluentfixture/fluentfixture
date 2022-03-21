import { TypeUtils } from '@fluentfixture/shared';
import { Options } from './types/options';

/**
 * `OptionsWrapper` is a wrapper for options to ensure parameter values.
 */
export class OptionsWrapper {
  private readonly options: Options;

  /**
   * Creates an instance of `TemplateParser`.
   * @constructor
   * @param {Options=} [options] - options
   */
  public constructor(options?: Options) {
    this.options = OptionsWrapper.normalizeOptions(options);
  }

  /**
   * Returns the default options.
   * @public
   * @returns {Options}
   */
  public static defaultOptions(): Options {
    return {
      ignoreErrors: true
    };
  }

  /**
   * Returns the `ignoreErrors` option.
   * @public
   * @returns {boolean}
   */
  public getIgnoredErrors(): boolean {
    return this.options.ignoreErrors;
  }

  private static normalizeOptions(options?: Options) {
    const normalizedOptions = options || OptionsWrapper.defaultOptions();
    normalizedOptions.ignoreErrors = OptionsWrapper.normalizeBoolean(normalizedOptions.ignoreErrors, true);
    return normalizedOptions;
  }

  private static normalizeBoolean(value: boolean, defaultValue: boolean): boolean {
    return TypeUtils.isBoolean(value) ? value : defaultValue;
  }
}
