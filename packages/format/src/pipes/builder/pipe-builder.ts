import { Noop } from '../noop';
import { Query } from '../query';
import { Flow } from '../flow';
import { Pipe } from '../pipe';
import { Pipes } from '../factory/pipes';
import { Stringifier } from '../stringifier';
import { TokenParser } from '../../parsers/token-parser';
import { Constant } from '../constant';
import { Fallback } from '../fallback';
import { ErrorBoundary } from '../error-boundary';
import { TokenMetadata } from '../../parsers/types/token-metadata';
import { OptionsWrapper } from '../../option/options-wrapper';

export class PipeBuilder {
  private readonly parser: TokenParser;
  private readonly pipes: Pipes;
  private readonly options: OptionsWrapper;

  public constructor(parser: TokenParser, pipes: Pipes, options: OptionsWrapper) {
    this.parser = parser;
    this.pipes = pipes;
    this.options = options;
  }

  public constant(token: string): Pipe<any, string> {
    return new Constant(token);
  }

  public flow(token: string): Pipe<any, string> {
    const metadata = this.parser.parse(token);
    const pipes = [PipeBuilder.getInitialPipe(metadata)];

    if (metadata.fallback) {
      pipes.push(new Fallback(metadata.fallback));
    }

    for (const pipe of metadata.pipes) {
      pipes.push(this.decoratePipe(this.pipes.resolve(pipe)));
    }

    pipes.push(new Stringifier(this.pipes, this.options.getSerializers()));

    return new Flow(pipes);
  }

  private decoratePipe(pipe: Pipe): Pipe {
    return this.options.ignoreErrors() ? new ErrorBoundary(pipe) : pipe;
  }

  private static getInitialPipe(metadata: TokenMetadata): Pipe {
    return metadata.query ? new Query(metadata.query) : new Noop();
  }
}
