import { Formatter } from './formatter';
import { Pipes } from './pipes/factory/pipes';
import { Template } from './template';

export const formatter = Formatter.create(Pipes.withDefaults());

export const format = (template: string, source: any): string => formatter.format(template, source);

export const compile = (template: string): Template => formatter.compile(template);
