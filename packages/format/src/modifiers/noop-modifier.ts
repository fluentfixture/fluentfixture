import { ExpressionModifier } from '../types/expression-modifier';

export const getNoopExpressionModifier = (): ExpressionModifier => {
  return (output: string) => output;
}
