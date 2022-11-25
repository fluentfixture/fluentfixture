import { Pipe } from './pipe';

export class ErrorBoundary<T = any, K = any> extends Pipe<T, K | undefined> {
  private readonly pipe: Pipe<T, K>;

  public constructor(pipe: Pipe<T, K>) {
    super();
    this.pipe = pipe;
  }

  public handle(input?: T): K | undefined {
    try {
      return this.pipe.handle(input);
    } catch {
      return undefined;
    }
  }

  public getPipe(): Pipe<T, K> {
    return this.pipe;
  }
}
