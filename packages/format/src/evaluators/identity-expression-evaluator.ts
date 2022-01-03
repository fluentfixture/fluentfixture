import { ExpressionEvaluator } from '../types/expression-evaluator';

export const getIdentityExpressionEvaluator = (): ExpressionEvaluator => {
  return (source: any) => source.toString();
};
