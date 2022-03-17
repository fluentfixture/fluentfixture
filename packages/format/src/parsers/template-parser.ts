import { TypeUtils } from '@fluentfixture/shared';
import { GeneratorBuilder } from '../generators/builder/generator-builder';
import { Generator } from '../generators/generator';

/**
 * `TemplateParser` accepts a template literal and converts to list of generators.
 * @class
 */
export class TemplateParser {
  private static readonly InterpolationRegexp = /([{}])\1|{(.*?)(?:!(.+?))?}/g;
  private readonly builder: GeneratorBuilder;

  /**
   * Creates an instance of `TemplateParser`.
   * @constructor
   * @param {GeneratorBuilder} [builder] - generator builder
   */
  public constructor(builder: GeneratorBuilder) {
    this.builder = builder;
  }

  /**
   * Parses the given template literal
   * @public
   * @param {string} [template] - template literal
   * @returns {Generator[]}
   */
  public parse(template: string): ReadonlyArray<Generator<any, string>> {
    const generators = [];

    if (!TypeUtils.isNonEmptyString(template)) {
      return generators;
    }

    let cursor = 0;
    const matches = template.matchAll(TemplateParser.InterpolationRegexp);

    for (const match of matches) {
      if (match.index > cursor) {
        generators.push(this.builder.buildStatic(template.slice(cursor, match.index)));
      }
      generators.push(this.builder.buildDynamic(match[0]));
      cursor = match.index + match[0].length;
    }

    if (cursor < template.length ) {
      generators.push(this.builder.buildStatic(template.slice(cursor)));
    }

    return generators;
  }
}
