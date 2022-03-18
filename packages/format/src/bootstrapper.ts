import { StringUtils } from '@fluentfixture/shared';
import { TemplateParser } from './parsers/template-parser';
import { GeneratorBuilder } from './generators/builder/generator-builder';
import { TokenParser } from './parsers/token-parser';
import { GeneratorFactory } from './generators/factory/generator-factory';
import { asGenerator } from './generators/generators';
import { Options } from './parsers/types/options';
import { extendOptions } from './parsers/options';
import { CompiledTemplate } from './parsers/compiled-template';

/**
 * Creates a generator factory with pre-defined functions.
 * @returns {GeneratorFactory}
 */
const createGeneratorFactory = (): GeneratorFactory => {
  const generatorFactory = new GeneratorFactory();

  generatorFactory.set('lower-case', asGenerator(StringUtils.lowerCase));
  generatorFactory.set('upper-case', asGenerator(StringUtils.upperCase));
  generatorFactory.set('constant-case', asGenerator(StringUtils.constantCase));
  generatorFactory.set('dot-case', asGenerator(StringUtils.dotCase));
  generatorFactory.set('header-case', asGenerator(StringUtils.headerCase));
  generatorFactory.set('param-case', asGenerator(StringUtils.paramCase));
  generatorFactory.set('pascal-case', asGenerator(StringUtils.pascalCase));
  generatorFactory.set('snake-case', asGenerator(StringUtils.snakeCase));
  generatorFactory.set('capital-case', asGenerator(StringUtils.capitalCase));
  generatorFactory.set('camel-case', asGenerator(StringUtils.camelCase));
  generatorFactory.set('trim', asGenerator(StringUtils.trim));
  generatorFactory.set('trim-start', asGenerator(StringUtils.trimStart));
  generatorFactory.set('trim-end', asGenerator(StringUtils.trimEnd));
  generatorFactory.set('iso-date', asGenerator((date: Date) => date.toISOString()));

  return generatorFactory;
};

/**
 * The singleton generator factory.
 */
const generatorFactory = createGeneratorFactory();

/**
 * Creates a `TemplateParser` by using the given options.
 * @public
 * @param {Options=} [options] - options
 * @returns {TemplateParser}
 */
const createParser = (options?: Options): TemplateParser => {
  return new TemplateParser(new GeneratorBuilder(new TokenParser(), generatorFactory, extendOptions(options)));
};

/**
 * Register a generator with the given name.
 * @public
 * @param {string} [name] - generator name
 * @param {function(*):*} [fn] - generator function.
 */
export const register = (name: string, fn: GeneratorFunction): void => {
  generatorFactory.set(name, asGenerator(fn));
};

/**
 * Formats the given source object with the give template directly.
 * @public
 * @param {string} [template] - template literal
 * @param {*} [source] - source object
 * @param {Options=} [options] - options
 * @returns {string}
 */
export const format = (template: string, source: any, options?: Options): string => {
  return new CompiledTemplate(createParser(options).parse(template)).format(source);
};

/**
 * Creates a compiled template by using the given template.
 * @public
 * @param {string} [template] - template literal
 * @param {Options=} [options] - template options
 * @returns {CompiledTemplate}
 */
export const compile = (template: string, options?: Options): CompiledTemplate => {
  return new CompiledTemplate(createParser(options).parse(template));
};
