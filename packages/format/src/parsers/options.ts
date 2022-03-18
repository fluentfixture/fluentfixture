import { TypeUtils } from '@fluentfixture/shared';
import { Options } from './types/options';

const getDefaultOptions = (): Options => {
  return {
    ignoreErrors: true
  };
};

const getOrDefault = <T>(option: T, fallback: T): T => {
  return TypeUtils.isAssigned(option) ? option : fallback;
};

/**
 * Normalize the given options.
 * @param {Options=} [options] - options
 * @returns {Options}
 */
export const extendOptions = (options?: Options): Options => {
  const normalized = options || getDefaultOptions();
  normalized.ignoreErrors = getOrDefault(normalized.ignoreErrors, true);
  return normalized;
};
