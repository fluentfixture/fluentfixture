import { ExpressionModifier } from '../types/expression-modifier';

export const getFallbackExpressionModifier = (fallback: string): ExpressionModifier => {
  return (output: string) => !!output ? output : fallback;
}
