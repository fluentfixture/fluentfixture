import { INTERPOLATION_REGEXP } from './constants/constants';
import { TransformerFactory } from './types/transformer-factory';
import { isNonEmptyString } from './utils/type-checks';
import { build } from './transformers/builders/transformer-builder';
import { Transformer } from './types/transformer';

type ParsingRule<T> = {
  defaultValue: T,
  staticTransformer: (expression: string, previous: T) => T;
  dynamicTransformer: (expression: string, previous: T) => T;
}

const parsingAlgorithm = <T>(template: string, rules: ParsingRule<T>): T => {
  if (!isNonEmptyString(template)) {
    return rules.defaultValue;
  }

  let cursor = 0;
  let result = rules.defaultValue;
  const matches = template.matchAll(INTERPOLATION_REGEXP);

  for (const match of matches) {
    if (match.index > cursor) {
      result = rules.staticTransformer(template.slice(cursor, match.index), result);
    }
    result = rules.dynamicTransformer(match[0], result);
    cursor = match.index + match[0].length;
  }

  if (cursor < template.length ) {
    result = rules.staticTransformer(template.slice(cursor), result);
  }

  return result;
}

export const compileToString = (template: string, source: any, factory: TransformerFactory): string => {
  return parsingAlgorithm(template, {
    defaultValue: '',
    staticTransformer: (expression, previous) => previous + expression,
    dynamicTransformer: (expression, previous) => previous + build(expression, factory)(source)
  });
}

export const compileToTransformers = (template: string, factory: TransformerFactory): Array<Transformer> => {
  return parsingAlgorithm(template, {
    defaultValue: [],
    staticTransformer: (expression,previous) => { previous.push(build(expression, factory)); return previous; },
    dynamicTransformer: (expression,previous) => { previous.push(build(expression, factory)); return previous; }
  });
}
