import { Noop } from '../noop';
import { Query } from '../query';
import { Flow } from '../flow';
import { Pipe } from '../pipe';
import { PipeFactory } from '../factory/pipe-factory';
import { Stringifier } from '../stringifier';
import { TokenParser } from '../../parsers/token-parser';
import { Constant } from '../constant';
import { Fallback } from '../fallback';
import { ErrorBoundary } from '../error-boundary';
import { TokenMetadata } from '../../parsers/types/token-metadata';
import { OptionsWrapper } from '../../option/options-wrapper';

/**
 * `PipeBuilder` builds a flow by using the given token.
 * @class
 */
export class PipeBuilder {
  private readonly parser: TokenParser;
  private readonly factory: PipeFactory;
  private readonly options: OptionsWrapper;

  /**
   * Creates an instance of `PipeBuilder`.
   * @constructor
   * @param {TokenParser} [parser] - token parser instance
   * @param {PipeFactory} [factory] - pipe factory instance
   * @param {OptionsWrapper} [options] - options
   */
  public constructor(parser: TokenParser, factory: PipeFactory, options: OptionsWrapper) {
    this.parser = parser;
    this.factory = factory;
    this.options = options;
  }

  /**
   * Creates a static pipe.
   * @see Constant
   * @public
   * @param {string} [token] - token
   * @returns {Pipe.<*,string>}
   */
  public constant(token: string): Pipe<any, string> {
    return new Constant(token);
  }

  /**
   * Creates a flow pipe.
   * @see Flow
   * @public
   * @param {string} [token] - token
   * @returns {Pipe.<*,string>}
   */
  public flow(token: string): Pipe<any, string> {
    const metadata = this.parser.parse(token);
    const pipes = [PipeBuilder.getInitialPipe(metadata)];

    if (metadata.fallback) {
      pipes.push(new Fallback(metadata.fallback));
    }

    for (const pipe of metadata.pipes) {
      pipes.push(this.decoratePipe(this.factory.get(pipe)));
    }

    pipes.push(new Stringifier());

    return new Flow(pipes);
  }

  private decoratePipe(pipe: Pipe): Pipe {
    return this.options.getIgnoredErrors() ? new ErrorBoundary(pipe) : pipe;
  }

  private static getInitialPipe(metadata: TokenMetadata): Pipe {
    return metadata.query ? new Query(metadata.query) : new Noop();
  }
}
