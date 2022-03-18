import { StringUtils } from '@fluentfixture/shared';
import { TemplateParser } from './parsers/template-parser';
import { GeneratorBuilder } from './generators/builder/generator-builder';
import { TokenParser } from './parsers/token-parser';
import { GeneratorFactory } from './generators/factory/generator-factory';
import { asGenerator } from './helpers/generators';
import { Options } from './parsers/types/options';
import { extendOptions } from './parsers/options';

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

const tokenParser = new TokenParser();
const generatorFactory = createGeneratorFactory();

/**
 * Creates a `TemplateParser` by using the given options.
 * @public
 * @param {Options=} [options] - options
 * @returns {TemplateParser}
 */
export const createParser = (options?: Options): TemplateParser => {
  return new TemplateParser(new GeneratorBuilder(tokenParser, generatorFactory, extendOptions(options)));
};

