import { compileToString } from './template-parser';
import { transformers } from './transformers/factory/build-in-transformer';

export const format = (template: string, source: any): string => {
  return compileToString(template, source, transformers);
}
