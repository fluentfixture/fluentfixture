import { TypeUtils } from '@fluentfixture/shared';
import { Options } from './types/options';

export class OptionsWrapper {
  private readonly options: Options;

  public constructor(options?: Options) {
    this.options = OptionsWrapper.normalizeOptions(options);
  }

  public ignoreErrors(): boolean {
    return this.options.ignoreErrors;
  }

  private static defaultOptions(): Options {
    return {
      ignoreErrors: true
    };
  }

  private static normalizeOptions(options?: Options): Options {
    const normalizedOptions = options || OptionsWrapper.defaultOptions();
    normalizedOptions.ignoreErrors = OptionsWrapper.normalizeBoolean(normalizedOptions.ignoreErrors, true);
    return normalizedOptions;
  }

  private static normalizeBoolean(value: boolean, defaultValue: boolean): boolean {
    return TypeUtils.isBoolean(value) ? value : defaultValue;
  }
}
