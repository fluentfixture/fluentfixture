import { TypeUtils } from '@fluentfixture/shared';

/**
 * `PathFinder` extracts data from the given input by using the given path query.
 * @class
 */
export class PathFinder {

  /**
   * Extracts data from the given input by using the given path query.
   * @public
   * @static
   * @param {*} [source] - source
   * @param {string} [path] - path
   * @returns {*|undefined}
   */
  public static get(source: unknown, path: string): any|undefined {
    if (!TypeUtils.isString(path)) {
      throw new Error('Path must be a string!');
    }
    let result = source;
    const paths = path.split('.').filter(p => TypeUtils.isNonBlankString(p));

    for (const item of paths) {
      if (!TypeUtils.isAssigned(result) || !result.hasOwnProperty(item)) {
        return undefined;
      }
      result = result[item];
    }
    return result;
  }
}
