import { TypeUtils } from '@fluentfixture/shared';
import { Options } from './types/options';
import { Serializers } from './types/serializers';
import { Serializer } from './types/serializer';

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
   * Returns the `serializers` option.
   * @public
   * @returns {Serializer}
   */
  public getSerializers(): Readonly<Serializers> {
    return this.options.serializers;
  }

  private static defaultOptions(): Options {
    return {
      ignoreErrors: true,
      serializers: {
        null: null,
        undefined: null,
        number: null,
        string: null,
        boolean: null,
        date: null,
        symbol: null,
        array: null,
        function: null,
        object: null,
        unknown: null
      },
    };
  }

  private static normalizeOptions(options?: Options): Options {
    const normalizedOptions = options || OptionsWrapper.defaultOptions();
    normalizedOptions.serializers = OptionsWrapper.normalizeSerializers(normalizedOptions.serializers);
    normalizedOptions.ignoreErrors = OptionsWrapper.normalizeBoolean(normalizedOptions.ignoreErrors, true);
    return normalizedOptions;
  }

  private static normalizeSerializers(serializers: Serializers): Serializers {
    const defaultSerializers = OptionsWrapper.defaultOptions().serializers;
    const normalized = serializers || defaultSerializers;
    for (const key of Object.keys(defaultSerializers)) {
      normalized[key] = OptionsWrapper.normalizeSerializer(normalized[key]);
    }
    return normalized;
  }

  private static normalizeBoolean(value: boolean, defaultValue: boolean): boolean {
    return TypeUtils.isBoolean(value) ? value : defaultValue;
  }

  private static normalizeSerializer(value: Serializer): Serializer | null {
    return TypeUtils.isNonBlankString(value) || TypeUtils.isFunction(value) ? value : null;
  }
}
