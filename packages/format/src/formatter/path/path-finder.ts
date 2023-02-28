import { TypeUtils } from '@fluentfixture/shared';
import { PathDefinition } from '../syntax/types/path-definition';

export class PathFinder {

  public static get(source: unknown, path: PathDefinition): any {
    if (!TypeUtils.isAssigned(path)) {
      throw new Error('Path must not be null or undefined!');
    }
    if (!TypeUtils.isNonBlankString(path.value)) {
      throw new Error('Path must be a non-empty string!');
    }
    let result = source;
    const paths = path.value.split('.');

    for (const item of paths) {
      if (!TypeUtils.isAssigned(result) || !result.hasOwnProperty(item)) {
        return undefined;
      }
      result = result[item];
    }

    if (path.type === 'PROPERTY') {
      return result;
    }

    if (!TypeUtils.isFunction(result)) {
      throw new Error(`The property ${path.value} is not a function!`);
    }

    return result(...path.parameters);
  }
}
