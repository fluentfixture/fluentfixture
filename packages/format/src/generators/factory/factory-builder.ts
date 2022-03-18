import { StringUtils } from '@fluentfixture/shared';
import { Functional } from '../functional';
import { GeneratorFactory } from './generator-factory';

/**
 * Creates a generator factory with pre-defined generators.
 * @public
 * @returns {GeneratorFactory}
 */
export const createGeneratorFactory = (): GeneratorFactory => {
  const generatorFactory = new GeneratorFactory();

  generatorFactory.set('lower-case', new Functional(StringUtils.lowerCase));
  generatorFactory.set('upper-case', new Functional(StringUtils.upperCase));
  generatorFactory.set('constant-case', new Functional(StringUtils.constantCase));
  generatorFactory.set('dot-case', new Functional(StringUtils.dotCase));
  generatorFactory.set('header-case', new Functional(StringUtils.headerCase));
  generatorFactory.set('param-case', new Functional(StringUtils.paramCase));
  generatorFactory.set('pascal-case', new Functional(StringUtils.pascalCase));
  generatorFactory.set('snake-case', new Functional(StringUtils.snakeCase));
  generatorFactory.set('capital-case', new Functional(StringUtils.capitalCase));
  generatorFactory.set('camel-case', new Functional(StringUtils.camelCase));
  generatorFactory.set('trim', new Functional(StringUtils.trim));
  generatorFactory.set('trim-start', new Functional(StringUtils.trimStart));
  generatorFactory.set('trim-end', new Functional(StringUtils.trimEnd));
  generatorFactory.set('iso-date', new Functional((date: Date) => date.toISOString()));

  return generatorFactory;
};
