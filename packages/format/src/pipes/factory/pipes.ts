import { TypeUtils } from '@fluentfixture/shared';
import { PipeFunction } from '../types/pipe-function';
import { initializeWithDefaults } from './default-pipes';

export class Pipes {
  private static readonly PipeNameRegexp = /^[$_a-z][\w$]*$/i;
  private readonly pipes: Map<string, PipeFunction>;

  private constructor() {
    this.pipes = new Map<string, PipeFunction>();
  }

  public static empty(): Pipes {
    return new Pipes();
  }

  public static withDefaults(): Pipes {
    const pipes = Pipes.empty();
    initializeWithDefaults(pipes);
    return pipes;
  }

  public resolve(name: string): PipeFunction {
    Pipes.assertPipeName(name);
    const pipeName = name.trim();
    if (!this.pipes.has(pipeName)) {
      throw new Error(`Pipe with name "${pipeName}" could not be found!`);
    }
    return this.pipes.get(pipeName);
  }

  public register(name: string, pipe: PipeFunction): Pipes {
    Pipes.assertPipeName(name);
    if (!TypeUtils.isFunction(pipe)) {
      throw new Error('Pipe name must be a function!');
    }
    this.pipes.set(name.trim(), pipe);
    return this;
  }

  public unregister(name: string): Pipes {
    Pipes.assertPipeName(name);
    this.pipes.delete(name.trim());
    return this;
  }

  public clearAll(): Pipes {
    this.pipes.clear();
    return this;
  }

  private static assertPipeName(name: string): void {
    if (!TypeUtils.isNonBlankString(name)) {
      throw new Error('Pipe name must be a non-blank string!');
    }

    if (!Pipes.PipeNameRegexp.test(name.trim())) {
      throw new Error('Pipe name must be a valid function name!');
    }
  }
}
