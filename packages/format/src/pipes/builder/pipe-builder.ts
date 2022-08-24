import { TypeUtils } from '@fluentfixture/shared';
import { Noop } from '../noop';
import { Query } from '../query';
import { Flow } from '../flow';
import { Pipe } from '../pipe';
import { Pipes } from '../factory/pipes';
import { Stringifier } from '../stringifier';
import { Constant } from '../constant';
import { ErrorBoundary } from '../error-boundary';
import { OptionsWrapper } from '../../option/options-wrapper';
import { Engine } from '../../syntax/engine';
import { Functional } from '../functional';
import { SyntaxDefinition } from '../../syntax/types/syntax-definition';

export class PipeBuilder {
  private readonly engine: Engine;
  private readonly pipes: Pipes;
  private readonly options: OptionsWrapper;

  public constructor(engine: Engine, pipes: Pipes, options: OptionsWrapper) {
    this.engine = engine;
    this.pipes = pipes;
    this.options = options;
  }

  public constant(token: string): Pipe<any, string> {
    return new Constant(token);
  }

  public flow(token: string): Pipe<any, string> {
    const definition = this.engine.parse(token);
    const pipes = [PipeBuilder.getInitialPipe(definition)];

    for (const pipe of definition.pipes) {
      const pipeFunction = this.pipes.resolve(pipe.name);
      const functional = new Functional({ fn: pipeFunction, parameters: pipe.parameters });
      pipes.push(this.decoratePipe(functional));
    }

    pipes.push(Stringifier.instance());

    return new Flow(pipes);
  }

  private decoratePipe(pipe: Pipe): Pipe {
    return this.options.ignoreErrors() ? new ErrorBoundary(pipe) : pipe;
  }

  private static getInitialPipe(definition: SyntaxDefinition): Pipe {
    return TypeUtils.isNonBlankString(definition.path) ? new Query(definition.path) : Noop.instance();
  }
}
