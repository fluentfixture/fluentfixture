import * as path from 'object-path';
import { ExpressionEvaluator } from '../types/expression-evaluator';

export const getDynamicExpressionEvaluator = (expression: string): ExpressionEvaluator => {
  return (source: any) => path.get(source, expression, '').toString();
};
