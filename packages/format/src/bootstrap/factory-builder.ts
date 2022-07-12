import { StringUtils, DateUtils } from '@fluentfixture/shared';
import { SUPPORTED_DATE_FORMATS } from '../constants/date-formats';
import { PipeFactory } from '../pipes/factory/pipe-factory';

const addDateFormatPipes = (factory: PipeFactory, formats: ReadonlyArray<string>): void => {
  for (const format of formats) {
    factory.registerFunction(format, (date: Date) => DateUtils.format(date, format));
  }
};

export const createPipeFactory = (): PipeFactory => {
  const factory = new PipeFactory();

  factory.registerFunction('lower-case', StringUtils.lowerCase);
  factory.registerFunction('upper-case', StringUtils.upperCase);
  factory.registerFunction('constant-case', StringUtils.constantCase);
  factory.registerFunction('dot-case', StringUtils.dotCase);
  factory.registerFunction('header-case', StringUtils.headerCase);
  factory.registerFunction('param-case', StringUtils.paramCase);
  factory.registerFunction('pascal-case', StringUtils.pascalCase);
  factory.registerFunction('path-case', StringUtils.pathCase);
  factory.registerFunction('snake-case', StringUtils.snakeCase);
  factory.registerFunction('capital-case', StringUtils.capitalCase);
  factory.registerFunction('camel-case', StringUtils.camelCase);
  factory.registerFunction('trim', StringUtils.trim);
  factory.registerFunction('trim-start', StringUtils.trimStart);
  factory.registerFunction('trim-end', StringUtils.trimEnd);

  addDateFormatPipes(factory, SUPPORTED_DATE_FORMATS);

  return factory;
};
