import { ExpressionEvaluator } from '../types/expression-evaluator';

export const getStaticExpressionEvaluator = (expression: string): ExpressionEvaluator => {
  return () => expression;
};
