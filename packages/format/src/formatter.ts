import { TemplateParser } from './parsers/template-parser';
import { PipeBuilder } from './pipes/builder/pipe-builder';
import { TokenParser } from './parsers/token-parser';
import { PipeFactory } from './pipes/factory/pipe-factory';
import { Options } from './option/types/options';
import { CompiledFormatter } from './compiled-formatter';
import { createPipeFactory } from './pipes/factory/factory-builder';
import { Functional } from './pipes/functional';
import { OptionsWrapper } from './option/options-wrapper';
import { PipeFunction } from './pipes/types/pipe-function';

/**
 * `Formatter` class that provides a set of method for formatting templates.
 * @class
 */
export class Formatter {
  private readonly factory: PipeFactory;
  private readonly parser: TemplateParser;

  /**
   * Creates an instance of `Formatter`.
   * @constructor
   * @param {PipeFactory} [factory] - options
   * @param {TemplateParser} [parser] - options
   */
  private constructor(factory: PipeFactory, parser: TemplateParser) {
    this.factory = factory;
    this.parser = parser;
  }

  /**
   * Creates an instance of `Formatter` without any pre-defined pipes.
   * @public
   * @static
   * @param {Options=} [options] - options
   * @returns {Formatter}
   */
  public static empty(options?: Options): Formatter {
    const factory = new PipeFactory();
    const parser = new TemplateParser(new PipeBuilder(new TokenParser(), factory, new OptionsWrapper(options)));
    return new Formatter(factory, parser);
  }

  /**
   * Creates an instance of `Formatter` with the pre-defined pipes.
   * @public
   * @static
   * @param {Options=} [options] - options
   * @returns {Formatter}
   */
  public static create(options?: Options): Formatter {
    const factory = createPipeFactory();
    const parser = new TemplateParser(new PipeBuilder(new TokenParser(), factory, new OptionsWrapper(options)));
    return new Formatter(factory, parser);
  }

  /**
   * Compiles the given template.
   * @public
   * @param {string} [template] - template
   * @returns {CompiledFormatter}
   */
  public compile(template: string): CompiledFormatter {
    return new CompiledFormatter(this.parser.parse(template));
  }

  /**
   * Formats the given template with the given source.
   * @public
   * @param {string} [template] - template
   * @param {*} [source] - source
   * @returns {string}
   */
  public format(template: string, source: any): string {
    return this.compile(template).format(source);
  }

  /**
   * Registers a new pipe by using the given name.
   * @public
   * @param {string} [name] - name
   * @param {function(*):*} [fn] - function
   */
  public register(name: string, fn: PipeFunction): void {
    this.factory.set(name, new Functional(fn));
  }
}
