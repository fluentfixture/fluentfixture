import { TemplateParser } from './parsers/template-parser';
import { GeneratorBuilder } from './generators/builder/generator-builder';
import { TokenParser } from './parsers/token-parser';
import { GeneratorFactory } from './generators/factory/generator-factory';
import { Options } from './parsers/types/options';
import { normalize } from './parsers/options';
import { CompiledFormatter } from './compiled-formatter';
import { createGeneratorFactory } from './generators/factory/factory-builder';
import { Functional } from './generators/functional';

/**
 * `Formatter` is a class that provides a set of method for formatting templates.
 * @class
 */
export class Formatter {
  private readonly options: Options;
  private readonly factory: GeneratorFactory;
  private readonly parser: TemplateParser;

  /**
   * Creates an instance of `Formatter`.
   * @constructor
   * @param {Options=} [options] - options
   */
  public constructor(options?: Options) {
    this.options = normalize(options);
    this.factory = createGeneratorFactory();
    this.parser = new TemplateParser(new GeneratorBuilder(new TokenParser(), this.factory, this.options));
  }

  /**
   * Compiles the given template for reusing.
   * @public
   * @param {string} [template] - template
   * @returns {CompiledFormatter}
   */
  public compile(template: string): CompiledFormatter {
    return new CompiledFormatter(this.parser.parse(template));
  }

  /**
   * Formats the given template with the given source directly.
   * @public
   * @param {string} [template] - template
   * @param {*} [source] - source
   * @returns {string}
   */
  public format(template: string, source: any): string {
    return this.compile(template).format(source);
  }

  /**
   * Registers a new generator by using the given name and function.
   * @public
   * @param {string} [name] - name
   * @param {function(*):*} [fn] - function
   */
  public register(name: string, fn: GeneratorFunction): void {
    this.factory.set(name, new Functional(fn));
  }
}
