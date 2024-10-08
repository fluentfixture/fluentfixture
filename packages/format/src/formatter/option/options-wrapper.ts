import { TypeUtils } from '@fluentfixture/shared';
import { Options } from './types/options';

export class OptionsWrapper {
  private readonly options: Required<Options>;

  public constructor(options?: Options) {
    this.options = OptionsWrapper.normalizeOptions(options);
  }

  public ignoreErrors(): boolean {
    return this.options.ignoreErrors;
  }

  private static normalizeOptions(options?: Options): Required<Options> {
    return {
      ignoreErrors: TypeUtils.isBoolean(options?.ignoreErrors) ? options?.ignoreErrors : true
    };
  }
}
