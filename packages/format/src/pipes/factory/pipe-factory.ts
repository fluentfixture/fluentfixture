import { TypeUtils } from '@fluentfixture/shared';
import { Pipe } from '../pipe';

export class PipeFactory {
  private readonly pipes: Map<string, Pipe>;

  public constructor() {
    this.pipes = new Map<string, Pipe>();
  }

  public set(name: string, pipe: Pipe): void {
    if (!TypeUtils.isNonBlankString(name)) {
      throw new Error('Pipe name must be a non-blank string!');
    }
    if (!TypeUtils.isObject(pipe)) {
      throw new Error('Pipe must be an object!');
    }
    const pipeName = name.trim();
    if (this.pipes.has(pipeName)) {
      throw new Error(`Pipe with name "${pipeName}" already registered!`);
    }
    this.pipes.set(pipeName, pipe);
  }

  public get(name: string): Pipe {
    if (!TypeUtils.isNonBlankString(name)) {
      throw new Error('Pipe name must be a non-blank string!');
    }
    const pipeName = name.trim();
    if (!this.pipes.has(pipeName)) {
      throw new Error(`Pipe with name "${pipeName}" could not be found!`);
    }
    return this.pipes.get(pipeName);
  }
}
