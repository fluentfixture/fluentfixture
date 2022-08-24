import { TypeUtils } from '@fluentfixture/shared';
import { PipeBuilder } from '../pipes/builder/pipe-builder';
import { Pipe } from '../pipes/pipe';

export class TemplateParser {
  private static readonly InterpolationRegexp = /\${(.*?)}/g;
  private readonly builder: PipeBuilder;

  public constructor(builder: PipeBuilder) {
    this.builder = builder;
  }

  public parse(template: string): ReadonlyArray<Pipe<any, string>> {
    const pipes = [];

    if (!TypeUtils.isNonEmptyString(template)) {
      return pipes;
    }

    let cursor = 0;
    const matches = template.matchAll(TemplateParser.InterpolationRegexp);

    for (const match of matches) {
      if (match.index > cursor) {
        pipes.push(this.builder.constant(template.slice(cursor, match.index)));
      }
      pipes.push(this.builder.flow(match[0].slice(2, -1)));
      cursor = match.index + match[0].length;
    }

    if (cursor < template.length ) {
      pipes.push(this.builder.constant(template.slice(cursor)));
    }

    return pipes;
  }
}
