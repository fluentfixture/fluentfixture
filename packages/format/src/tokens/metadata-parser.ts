import {
  TOKEN_DEFAULT_DELIMITER,
  TOKEN_END_CHAR,
  TOKEN_OPERATOR_DELIMITER,
  TOKEN_START_CHAR,
} from '../constants/constants';
import { TokenMetadata } from '../types/token-metadata';

const stripTemplateTags = (expression: string): string => {
  if (!expression || expression.trim().length <= 2) {
    return '';
  }
  return expression.trim().slice(1, - 1).trim();
}

const splitExpressionByIndex = (expression: string, index: number): [string, string] => {
  return [expression.slice(0, index).trim(), expression.slice(index + 1).trim()];
}

const isDynamicToken = (expression: string): boolean => {
  return !!expression && expression.startsWith(TOKEN_START_CHAR) && expression.endsWith(TOKEN_END_CHAR);
}

const hasModifier = (expression: string): boolean => expression.includes(TOKEN_OPERATOR_DELIMITER);

const hasFallback = (expression: string): boolean => expression.includes(TOKEN_DEFAULT_DELIMITER);

const parseStaticTokenMetadata = (expression: string): TokenMetadata => {
  return {
    expression,
    fallback: null,
    modifiers: [],
    dynamic: false
  };
}

const parseWithoutModifier = (expression: string, metadata: TokenMetadata): TokenMetadata => {
  if (hasFallback(expression)) {
    const index = expression.indexOf(TOKEN_DEFAULT_DELIMITER);
    const [token, fallback] = splitExpressionByIndex(expression, index);
    metadata.expression = token;
    metadata.fallback = fallback;
  } else {
    metadata.expression = expression;
  }
  return metadata;
}

const parseWithModifier = (expression: string, metadata: TokenMetadata): TokenMetadata => {
  const index = expression.lastIndexOf(TOKEN_OPERATOR_DELIMITER);
  const [remaining, modifier] = splitExpressionByIndex(expression, index);
  metadata.modifiers.push(modifier);

  return hasModifier(remaining)
    ? parseWithModifier(remaining, metadata)
    : parseWithoutModifier(remaining, metadata);
}

const parseDynamicTokenMetadata = (expression: string): TokenMetadata => {
  const rawExpression = stripTemplateTags(expression);
  const metadata = {
    expression: null,
    modifiers: [],
    fallback: null,
    dynamic: true
  };

  return hasModifier(rawExpression)
    ? parseWithModifier(rawExpression, metadata)
    : parseWithoutModifier(rawExpression, metadata);
}

const normalizeMetadata = (metadata: TokenMetadata): TokenMetadata => {
  return {
    expression: metadata.expression,
    modifiers: metadata.modifiers.filter(Boolean).reverse(),
    fallback: metadata.fallback,
    dynamic: metadata.dynamic
  };
}

export const parseTokenMetadata = (token: string): TokenMetadata => {
  const metadata = isDynamicToken(token)
    ? parseDynamicTokenMetadata(token)
    : parseStaticTokenMetadata(token);

  return normalizeMetadata(metadata);
}
