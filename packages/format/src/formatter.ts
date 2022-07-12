import { TemplateParser } from './parsers/template-parser';
import { PipeBuilder } from './pipes/builder/pipe-builder';
import { TokenParser } from './parsers/token-parser';
import { PipeFactory } from './pipes/factory/pipe-factory';
import { Options } from './option/types/options';
import { Template } from './template';
import { createPipeFactory } from './bootstrap/factory-builder';
import { OptionsWrapper } from './option/options-wrapper';

export class Formatter {
  private readonly factory: PipeFactory;
  private readonly parser: TemplateParser;

  private constructor(factory: PipeFactory, parser: TemplateParser) {
    this.factory = factory;
    this.parser = parser;
  }

  public static empty(options?: Options): Formatter {
    const factory = new PipeFactory();
    const parser = new TemplateParser(new PipeBuilder(new TokenParser(), factory, new OptionsWrapper(options)));
    return new Formatter(factory, parser);
  }

  public static create(options?: Options): Formatter {
    const factory = createPipeFactory();
    const parser = new TemplateParser(new PipeBuilder(new TokenParser(), factory, new OptionsWrapper(options)));
    return new Formatter(factory, parser);
  }

  public compile(template: string): Template {
    return new Template(this.parser.parse(template));
  }

  public format(template: string, source: any): string {
    return this.compile(template).format(source);
  }

  public getPipeFactory(): PipeFactory {
    return this.factory;
  }
}
