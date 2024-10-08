import { TypeUtils } from '@fluentfixture/shared';
import { Pipe } from './pipes/pipe';
import { Engine } from './syntax/engine';
import { Pipes } from './pipes/pipes';
import { OptionsWrapper } from './option/options-wrapper';
import { Constant } from './pipes/constant';
import { Functional } from './pipes/functional';
import { Stringifier } from './pipes/stringifier';
import { Flow } from './pipes/flow';
import { Query } from './pipes/query';
import { ErrorBoundary } from './pipes/error-boundary';
import { Template } from './template';

const DOLLAR = '$';
const L_CURLY = '{';
const R_CURLY = '}';

export class TemplateBuilder {
  private readonly engine: Engine;
  private readonly pipes: Pipes;
  private readonly options: OptionsWrapper;

  public constructor(engine: Engine, pipes: Pipes, options: OptionsWrapper) {
    this.engine = engine;
    this.pipes = pipes;
    this.options = options;
  }

  public build(source: string): Template {
    if (!TypeUtils.isNonEmptyString(source)) {
      return new Template([]);
    }

    let cursor = 0;
    let tokenIdx = 0;
    let previousChar = '';
    let betweenBrackets = false;
    const pipes: Array<Pipe> = [];

    for (const ch of source) {
      if (betweenBrackets) {
        if (ch === R_CURLY) {
          betweenBrackets = false;
          pipes.push(this.buildPipe(source.slice(tokenIdx, cursor)));
          tokenIdx = cursor + 1;
        }
      } else {
        if (ch === L_CURLY && previousChar === DOLLAR) {
          betweenBrackets = true;
          if (cursor - tokenIdx > 1) {
            pipes.push(new Constant(source.slice(tokenIdx, cursor - 1)));
          }
          tokenIdx = cursor + 1;
        }
      }

      cursor++;
      previousChar = ch;
    }

    if (tokenIdx < cursor) {
      pipes.push(new Constant(source.slice(tokenIdx, cursor)));
    }

    return new Template(pipes);
  }

  private buildPipe(token: string): Pipe<any, string> {
    const expression = this.engine.parse(token);
    const pipes: Array<Pipe> = [];

    if (TypeUtils.isAssigned(expression.path)) {
      pipes.push(new Query(expression.path));
    }

    for (const pipe of expression.pipes) {
      const functional = new Functional({
        fn: this.pipes.resolve(pipe.name),
        parameters: pipe.parameters
      });
      pipes.push(this.options.ignoreErrors() ? new ErrorBoundary(functional) : functional);
    }

    pipes.push(Stringifier.instance());

    return new Flow(pipes);
  }
}
