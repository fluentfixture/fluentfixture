import { TypeUtils } from '@fluentfixture/shared';
import { PathDefinition } from '../syntax/types/path-definition';
import { Pipe } from './pipe';

export class Query<T = any> extends Pipe<T, unknown> {
  private readonly path: PathDefinition;

  public constructor(path: PathDefinition) {
    super();
    this.path = path;
  }

  public handle(input: T): unknown {
    const paths = this.path.value.split('.');
    let result = input;

    for (const path of paths) {
      if (!TypeUtils.isAssigned(result) || !result.hasOwnProperty(path)) {
        return undefined;
      }
      result = result[path];
    }

    if (this.path.type === 'PROPERTY') {
      return result;
    }

    if (!TypeUtils.isFunction(result)) {
      return undefined;
    }

    return result(...this.path.parameters);
  }

  public getQuery(): PathDefinition {
    return this.path;
  }
}
