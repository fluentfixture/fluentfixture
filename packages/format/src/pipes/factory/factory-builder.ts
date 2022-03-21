import { StringUtils } from '@fluentfixture/shared';
import { Functional } from '../functional';
import { PipeFactory } from './pipe-factory';

/**
 * Creates a `PipeFactory` with pre-defined pipes.
 * @public
 * @returns {PipeFactory}
 */
export const createPipeFactory = (): PipeFactory => {
  const factory = new PipeFactory();

  factory.set('lower-case', new Functional(StringUtils.lowerCase));
  factory.set('upper-case', new Functional(StringUtils.upperCase));
  factory.set('constant-case', new Functional(StringUtils.constantCase));
  factory.set('dot-case', new Functional(StringUtils.dotCase));
  factory.set('header-case', new Functional(StringUtils.headerCase));
  factory.set('param-case', new Functional(StringUtils.paramCase));
  factory.set('pascal-case', new Functional(StringUtils.pascalCase));
  factory.set('snake-case', new Functional(StringUtils.snakeCase));
  factory.set('capital-case', new Functional(StringUtils.capitalCase));
  factory.set('camel-case', new Functional(StringUtils.camelCase));
  factory.set('trim', new Functional(StringUtils.trim));
  factory.set('trim-start', new Functional(StringUtils.trimStart));
  factory.set('trim-end', new Functional(StringUtils.trimEnd));
  factory.set('iso-date', new Functional((date: Date) => date.toISOString()));

  return factory;
};
