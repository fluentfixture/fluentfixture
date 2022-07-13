import { StringUtils, DateUtils } from '@fluentfixture/shared';
import { SUPPORTED_DATE_FORMATS } from '../../constants/date-formats';
import { Pipes } from './pipes';

const addDateFormatPipes = (pipes: Pipes, formats: ReadonlyArray<string>): void => {
  for (const format of formats) {
    pipes.register(format, (date: Date) => DateUtils.format(date, format));
  }
};

export const initializeWithDefaults = (pipes: Pipes): void => {
  pipes.register('lower-case', StringUtils.lowerCase);
  pipes.register('upper-case', StringUtils.upperCase);
  pipes.register('constant-case', StringUtils.constantCase);
  pipes.register('dot-case', StringUtils.dotCase);
  pipes.register('header-case', StringUtils.headerCase);
  pipes.register('param-case', StringUtils.paramCase);
  pipes.register('pascal-case', StringUtils.pascalCase);
  pipes.register('path-case', StringUtils.pathCase);
  pipes.register('snake-case', StringUtils.snakeCase);
  pipes.register('capital-case', StringUtils.capitalCase);
  pipes.register('camel-case', StringUtils.camelCase);
  pipes.register('trim', StringUtils.trim);
  pipes.register('trim-start', StringUtils.trimStart);
  pipes.register('trim-end', StringUtils.trimEnd);

  addDateFormatPipes(pipes, SUPPORTED_DATE_FORMATS);
};
