import { TemplateParser } from './parsers/template-parser';
import { PipeBuilder } from './pipes/builder/pipe-builder';
import { Pipes } from './pipes/factory/pipes';
import { Options } from './option/types/options';
import { Template } from './template';
import { OptionsWrapper } from './option/options-wrapper';
import { Engine } from './syntax/engine';

export class Formatter {
  private readonly parser: TemplateParser;
  private readonly pipes: Pipes;

  private constructor(parser: TemplateParser, pipes: Pipes) {
    this.parser = parser;
    this.pipes = pipes;
  }

  public static empty(options?: Options): Formatter {
    const pipes = Pipes.empty();
    const parser = new TemplateParser(new PipeBuilder(Engine.instance(), pipes, new OptionsWrapper(options)));
    return new Formatter(parser, pipes);
  }

  public static create(pipes: Pipes, options?: Options): Formatter {
    const parser = new TemplateParser(new PipeBuilder(Engine.instance(), pipes, new OptionsWrapper(options)));
    return new Formatter(parser, pipes);
  }

  public compile(template: string): Template {
    return new Template(this.parser.parse(template));
  }

  public format(template: string, source: any): string {
    return this.compile(template).format(source);
  }

  public getPipes(): Pipes {
    return this.pipes;
  }
}
