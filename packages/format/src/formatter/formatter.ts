import { TemplateBuilder } from './template-builder';
import { Pipes } from './pipes/pipes';
import { Options } from './option/types/options';
import { Template } from './template';
import { OptionsWrapper } from './option/options-wrapper';
import { Engine } from './syntax/engine';

export class Formatter {
  private readonly builder: TemplateBuilder;

  private constructor(builder: TemplateBuilder) {
    this.builder = builder;
  }

  public static empty(options?: Options): Formatter {
    const pipes = Pipes.empty();
    const builder = new TemplateBuilder(Engine.instance(), pipes, new OptionsWrapper(options));
    return new Formatter(builder);
  }

  public static create(pipes: Pipes, options?: Options): Formatter {
    const builder = new TemplateBuilder(Engine.instance(), pipes, new OptionsWrapper(options));
    return new Formatter(builder);
  }

  public compile(template: string): Template {
    return this.builder.build(template);
  }

  public format(template: string, source: any): string {
    return this.compile(template).format(source);
  }
}
