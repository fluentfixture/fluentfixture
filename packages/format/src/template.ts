import { Pipe } from './pipes/pipe';

export class Template {
  private readonly pipes: ReadonlyArray<Pipe<any, string>>;

  public constructor(pipes: ReadonlyArray<Pipe<any, string>>) {
    this.pipes = pipes;
  }

  public format(source: any): string {
    return this.pipes.reduce((prev, pipe) => prev + pipe.handle(source), '');
  }
}
