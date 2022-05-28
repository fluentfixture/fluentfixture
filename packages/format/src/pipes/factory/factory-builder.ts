import { StringUtils, DateUtils } from '@fluentfixture/shared';
import { Functional } from '../functional';
import { SUPPORTED_DATE_FORMATS } from '../../constants/date-formats';
import { PipeFactory } from './pipe-factory';

const addDateFormatPipes = (factory: PipeFactory, formats: ReadonlyArray<string>): void => {
  for (const format of formats) {
    factory.set(format, new Functional((date: Date) => DateUtils.format(date, format)));
  }
};

export const createPipeFactory = (): PipeFactory => {
  const factory = new PipeFactory();

  factory.set('lower-case', new Functional(StringUtils.lowerCase));
  factory.set('upper-case', new Functional(StringUtils.upperCase));
  factory.set('constant-case', new Functional(StringUtils.constantCase));
  factory.set('dot-case', new Functional(StringUtils.dotCase));
  factory.set('header-case', new Functional(StringUtils.headerCase));
  factory.set('param-case', new Functional(StringUtils.paramCase));
  factory.set('pascal-case', new Functional(StringUtils.pascalCase));
  factory.set('path-case', new Functional(StringUtils.pathCase));
  factory.set('snake-case', new Functional(StringUtils.snakeCase));
  factory.set('capital-case', new Functional(StringUtils.capitalCase));
  factory.set('camel-case', new Functional(StringUtils.camelCase));
  factory.set('trim', new Functional(StringUtils.trim));
  factory.set('trim-start', new Functional(StringUtils.trimStart));
  factory.set('trim-end', new Functional(StringUtils.trimEnd));

  addDateFormatPipes(factory, SUPPORTED_DATE_FORMATS);

  return factory;
};
