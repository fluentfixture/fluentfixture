import { TypeUtils } from '@fluentfixture/shared';
import { Options } from './types/options';

const getDefaultOptions = (): Options => {
  return {
    ignoreErrors: true
  };
};

const checkBoolean = (option: boolean, fallback: boolean): boolean => {
  return TypeUtils.isBoolean(option) ? option : fallback;
};

/**
 * Normalize the given options.
 * @param {Options=} [options] - options
 * @returns {Options}
 */
export const extendOptions = (options?: Options): Options => {
  const normalized = options || getDefaultOptions();
  normalized.ignoreErrors = checkBoolean(normalized.ignoreErrors, true);
  return normalized;
};
