import { Pipe } from './pipe';
import { ParameterizedPipeFunction } from './types/parameterized-pipe-function';

export class Functional<T = any, K = any> extends Pipe<T, K> {
  private readonly pipe: ParameterizedPipeFunction<T, K>;

  public constructor(pipe: ParameterizedPipeFunction<T, K>) {
    super();
    this.pipe = pipe;
  }

  public handle(input: T): K {
    return this.pipe.fn(input, ...this.pipe.parameters);
  }

  public getPipe(): ParameterizedPipeFunction<T, K> {
    return this.pipe;
  }
}
