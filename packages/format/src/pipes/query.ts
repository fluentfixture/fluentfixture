import { PathFinder } from '../path/path-finder';
import { Pipe } from './pipe';

export class Query<T = any, K = any> extends Pipe<T, K> {
  private readonly query: string;

  public constructor(query: string) {
    super();
    this.query = query;
  }

  public handle(input: T): K {
    return PathFinder.get(input, this.query) as K;
  }

  public getQuery(): string {
    return this.query;
  }
}
