import { TypeUtils } from '@fluentfixture/shared';
import { Pipe } from '../pipe';
import { PipeFunction } from '../types/pipe-function';
import { Functional } from '../functional';
import { initializeWithDefaults } from './default-pipes';

export class Pipes {
  private readonly pipes: Map<string, Pipe>;

  private constructor() {
    this.pipes = new Map<string, Pipe>();
  }

  public static empty(): Pipes {
    return new Pipes();
  }

  public static withDefaults(): Pipes {
    const pipes = Pipes.empty();
    initializeWithDefaults(pipes);
    return pipes;
  }

  public resolve(name: string): Pipe {
    if (!TypeUtils.isNonBlankString(name)) {
      throw new Error('Pipe name must be a non-blank string!');
    }
    const pipeName = name.trim();
    if (!this.pipes.has(pipeName)) {
      throw new Error(`Pipe with name "${pipeName}" could not be found!`);
    }
    return this.pipes.get(pipeName);
  }

  public register(name: string, pipe: Pipe | PipeFunction): Pipes {
    if (!TypeUtils.isNonBlankString(name)) {
      throw new Error('Pipe name must be a non-blank string!');
    }
    const pipeName = name.trim();
    if (this.pipes.has(pipeName)) {
      throw new Error(`Pipe with name "${pipeName}" already registered!`);
    }
    if (TypeUtils.isFunction(pipe)) {
      this.pipes.set(pipeName, new Functional(pipe));
    }
    else if (pipe instanceof Pipe) {
      this.pipes.set(pipeName, pipe);
    } else {
      throw new Error('Pipe must be an instance of Pipe or a function!');
    }
    return this;
  }

  public unregister(name: string): Pipes {
    if (TypeUtils.isNonBlankString(name)) {
      this.pipes.delete(name.trim());
    }
    return this;
  }

  public clearAll(): Pipes {
    this.pipes.clear();
    return this;
  }
}
