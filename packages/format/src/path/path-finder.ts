import { TypeUtils } from '@fluentfixture/shared';

export class PathFinder {

  public static get(source: unknown, path: string): any {
    if (!TypeUtils.isString(path)) {
      throw new Error('Path must be a string!');
    }
    let result = source;
    const paths = path.split('.');

    for (const item of paths) {
      if (!TypeUtils.isAssigned(result) || !result.hasOwnProperty(item)) {
        return undefined;
      }
      result = result[item];
    }
    return result;
  }
}
