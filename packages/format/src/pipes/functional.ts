import { TypeUtils } from '@fluentfixture/shared';
import { PipeFunction } from './types/pipe-function';
import { Pipe } from './pipe';

export class Functional<T = any, K = any> extends Pipe<T, K> {
  private readonly pipe: PipeFunction<T, K>;

  public constructor(pipe: PipeFunction<T, K>) {
    if (!TypeUtils.isFunction(pipe)) {
      throw new Error('Pipe must be a function!');
    }
    super();
    this.pipe = pipe;
  }

  public handle(input: T): K {
    return this.pipe(input);
  }
}
