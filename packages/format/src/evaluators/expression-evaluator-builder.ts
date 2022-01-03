import { getFallbackExpressionModifier } from '../modifiers/fallback-modifier';
import { ExpressionEvaluator } from '../types/expression-evaluator';
import { TokenMetadata } from '../types/token-metadata';
import { ModifierFactory } from '../types/modifier-factory';
import { getDynamicExpressionEvaluator } from './dynamic-expression-evaluator';
import { getStaticExpressionEvaluator } from './static-expression-evaluator';
import { getIdentityExpressionEvaluator } from './identity-expression-evaluator';

const isIdentityExpression = (expression: string): boolean => expression.trim() === '';

const getEvaluatorByMetadata = (metadata: TokenMetadata): ExpressionEvaluator => {
  if (!metadata.dynamic) {
    return getStaticExpressionEvaluator(metadata.expression);
  }
  return isIdentityExpression(metadata.expression)
    ? getIdentityExpressionEvaluator()
    : getDynamicExpressionEvaluator(metadata.expression);
};

export const buildExpressionEvaluator = (metadata: TokenMetadata, factory: ModifierFactory): ExpressionEvaluator => {
  const evaluator = getEvaluatorByMetadata(metadata);
  const fallback = getFallbackExpressionModifier(!!metadata.fallback ? metadata.fallback : '');
  const modifiers = metadata.modifiers.map(i => factory.getModifier(i));

  return (source: any) => {
    let result = fallback(evaluator(source), source, metadata);
    for (const modifier of modifiers) {
      result = modifier(result, source, metadata);
    }
    return result;
  };
};
