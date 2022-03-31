import { TypeUtils } from '@fluentfixture/shared';
import { Options } from './types/options';
import { Defaults } from './types/defaults';
import { DefaultPipe } from './types/default-pipe';

/**
 * `OptionsWrapper` is a wrapper for options to ensure parameter values.
 */
export class OptionsWrapper {
  private readonly options: Options;

  /**
   * Creates an instance of `OptionsWrapper`.
   * @constructor
   * @param {Options=} [options] - options
   */
  public constructor(options?: Options) {
    this.options = OptionsWrapper.normalizeOptions(options);
  }

  /**
   * Returns the `ignoreErrors` option.
   * @public
   * @returns {boolean}
   */
  public ignoreErrors(): boolean {
    return this.options.ignoreErrors;
  }

  /**
   * Returns the `default-pipe` for the given data type.
   * @public
   * @param {string} [type] - type
   * @returns {DefaultPipe}
   */
  public getDefaultFor(type: keyof Defaults): DefaultPipe {
    return this.options.defaults[type];
  }

  private static defaultOptions(): Options {
    return {
      ignoreErrors: true,
      defaults: {
        date: null,
      },
    };
  }

  private static normalizeOptions(options?: Options): Options {
    const normalizedOptions = options || OptionsWrapper.defaultOptions();
    normalizedOptions.defaults = OptionsWrapper.normalizeDefaults(normalizedOptions.defaults);
    normalizedOptions.ignoreErrors = OptionsWrapper.normalizeBoolean(normalizedOptions.ignoreErrors, true);
    return normalizedOptions;
  }

  private static normalizeDefaults(defaults: Defaults): Defaults {
    const normalized = defaults || OptionsWrapper.defaultOptions().defaults;
    normalized.date = OptionsWrapper.normalizeDefaultPipe(normalized.date);
    return normalized;
  }

  private static normalizeBoolean(value: boolean, defaultValue: boolean): boolean {
    return TypeUtils.isBoolean(value) ? value : defaultValue;
  }

  private static normalizeDefaultPipe(value: DefaultPipe): DefaultPipe | null {
    return TypeUtils.isNonBlankString(value) || TypeUtils.isFunction(value) ? value : null;
  }
}
