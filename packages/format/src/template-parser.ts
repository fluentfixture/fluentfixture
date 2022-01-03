import { ExpressionEvaluator } from './types/expression-evaluator';
import { INTERPOLATION_REGEXP } from './constants/constants';
import { buildExpressionEvaluator } from './evaluators/expression-evaluator-builder';
import { parseTokenMetadata } from './tokens/metadata-parser';
import { ModifierFactory } from './types/modifier-factory';
import { isNonEmptyString } from './utils/type-checks';

const getExpressionEvaluator = (expression: string, factory: ModifierFactory): ExpressionEvaluator => {
  return buildExpressionEvaluator(parseTokenMetadata(expression), factory);
}

export const parseTemplate = (template: string, factory: ModifierFactory): ReadonlyArray<ExpressionEvaluator> => {
  if (!isNonEmptyString(template)) {
    return [];
  }

  let cursor = 0;
  const evaluators = [];
  const matches = template.matchAll(INTERPOLATION_REGEXP);

  for (const match of matches) {
    if (match.index > cursor) {
      evaluators.push(getExpressionEvaluator(template.slice(cursor, match.index), factory));
    }
    evaluators.push(getExpressionEvaluator(match[0], factory));
    cursor = match.index + match[0].length;
  }

  if (cursor < template.length ) {
    evaluators.push(getExpressionEvaluator(template.slice(cursor), factory));
  }

  return evaluators;
}
