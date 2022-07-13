import { TemplateParser } from './parsers/template-parser';
import { PipeBuilder } from './pipes/builder/pipe-builder';
import { TokenParser } from './parsers/token-parser';
import { Pipes } from './pipes/factory/pipes';
import { Options } from './option/types/options';
import { Template } from './template';
import { OptionsWrapper } from './option/options-wrapper';

export class Formatter {
  private readonly parser: TemplateParser;

  private constructor(parser: TemplateParser) {
    this.parser = parser;
  }

  public static empty(options?: Options): Formatter {
    const parser = new TemplateParser(new PipeBuilder(new TokenParser(), Pipes.empty(), new OptionsWrapper(options)));
    return new Formatter(parser);
  }

  public static create(pipes: Pipes, options?: Options): Formatter {
    const parser = new TemplateParser(new PipeBuilder(new TokenParser(), pipes, new OptionsWrapper(options)));
    return new Formatter(parser);
  }

  public compile(template: string): Template {
    return new Template(this.parser.parse(template));
  }

  public format(template: string, source: any): string {
    return this.compile(template).format(source);
  }
}
