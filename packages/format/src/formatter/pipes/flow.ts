import { Pipe } from './pipe';

export class Flow extends Pipe {
  private readonly pipes: ReadonlyArray<Pipe>;

  public constructor(pipes: ReadonlyArray<Pipe>) {
    super();
    this.pipes = pipes;
  }

  public handle(input?: any): any {
    return this.pipes.reduce((prev, pipe) => pipe.handle(prev), input);
  }

  public getPipes(): ReadonlyArray<Pipe> {
    return this.pipes;
  }
}
