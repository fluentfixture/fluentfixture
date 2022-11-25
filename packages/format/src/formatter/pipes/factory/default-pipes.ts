import { DateUtils, StringUtils } from '@fluentfixture/shared';
import { Pipes } from './pipes';

const registerStringPipes = (pipes: Pipes): void => {
  pipes.register('lowerCase', StringUtils.lowerCase);
  pipes.register('upperCase', StringUtils.upperCase);
  pipes.register('constantCase', StringUtils.constantCase);
  pipes.register('dotCase', StringUtils.dotCase);
  pipes.register('headerCase', StringUtils.headerCase);
  pipes.register('paramCase', StringUtils.paramCase);
  pipes.register('pascalCase', StringUtils.pascalCase);
  pipes.register('pathCase', StringUtils.pathCase);
  pipes.register('snakeCase', StringUtils.snakeCase);
  pipes.register('capitalCase', StringUtils.capitalCase);
  pipes.register('camelCase', StringUtils.camelCase);
  pipes.register('trim', StringUtils.trim);
  pipes.register('trimStart', StringUtils.trimStart);
  pipes.register('trimEnd', StringUtils.trimEnd);
  pipes.register('padStart', StringUtils.padStart);
  pipes.register('padEnd', StringUtils.padEnd);
  pipes.register('split', (str: string, ch: string) => str.split(ch));
};

export const registerDatePipes = (pipes: Pipes): void => {
  pipes.register('date', DateUtils.format);
};

export const registerArrayPipes = (pipes: Pipes): void => {
  pipes.register('reverse', (arr: Array<any>) => [...arr].reverse());
  pipes.register('join', (arr: Array<any>, ch: string) => arr.join(ch));
  pipes.register('sort', (arr: Array<any>) => [...arr].sort());
};

export const registerUtilityPipes = (pipes: Pipes): void => {
  pipes.register('default', (val: any, fallback: any) => val || fallback);
};

export const initializeWithDefaults = (pipes: Pipes): void => {
  registerStringPipes(pipes);
  registerDatePipes(pipes);
  registerArrayPipes(pipes);
  registerUtilityPipes(pipes);
};
