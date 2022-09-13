import { TypeUtils } from '@fluentfixture/shared';
import { NormalizedOptions } from './types/normalized-options';
import { Options } from './types/options';

export class OptionsWrapper {
  private readonly options: NormalizedOptions;

  public constructor(options?: Options) {
    this.options = OptionsWrapper.normalizeOptions(options);
  }

  public ignoreErrors(): boolean {
    return this.options.ignoreErrors;
  }

  private static normalizeOptions(options?: Options): NormalizedOptions {
    return {
      ignoreErrors: OptionsWrapper.normalizeBoolean(options?.ignoreErrors, true)
    };
  }

  private static normalizeBoolean(value: boolean | undefined, defaultValue: boolean): boolean {
    return TypeUtils.isBoolean(value) ? value : defaultValue;
  }
}
