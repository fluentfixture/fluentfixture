import { ExpressionEvaluator } from './types/expression-evaluator';
import { parseTemplate } from './template-parser';
import { modifiers } from './modifiers/modifier-factory';

export const compile = (template: string): ExpressionEvaluator => {
  const evaluators = parseTemplate(template, modifiers);
  return (source: any) => {
    let result = '';
    for (const evaluator of evaluators) {
      result += evaluator(source);
    }
    return result;
  }
}
