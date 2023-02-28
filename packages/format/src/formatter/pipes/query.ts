import { PathFinder } from '../path/path-finder';
import { PathDefinition } from '../syntax/types/path-definition';
import { Pipe } from './pipe';

export class Query<T = any, K = any> extends Pipe<T, K> {
  private readonly path: PathDefinition;

  public constructor(path: PathDefinition) {
    super();
    this.path = path;
  }

  public handle(input: T): K {
    return PathFinder.get(input, this.path) as K;
  }

  public getQuery(): PathDefinition {
    return this.path;
  }
}
