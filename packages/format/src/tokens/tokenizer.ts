import {
  FALLBACK_DELIMITER,
  EXPRESSION_END_CHAR,
  TRANSFORMER_DELIMITER,
  EXPRESSION_START_CHAR,
} from '../constants/constants';
import { Token } from '../types/token';
import { isNonEmptyString } from '../utils/type-checks';

const stripTemplateLiterals = (str: string): string => {
  return isNonEmptyString(str) && str.trim().length > 2
    ? str.trim().slice(1, -1).trim()
    : '';
};

const splitStringByIndex = (str: string, index: number): [string, string] => {
  return [str.slice(0, index).trim(), str.slice(index + 1).trim()];
};

const isDynamicToken = (expression: string): boolean => {
  return !!expression && expression.startsWith(EXPRESSION_START_CHAR) && expression.endsWith(EXPRESSION_END_CHAR);
};

const hasTransformer = (expression: string): boolean => expression.includes(TRANSFORMER_DELIMITER);

const hasFallback = (expression: string): boolean => expression.includes(FALLBACK_DELIMITER);

const getStaticToken = (expression: string): Token => {
  return {
    body: expression,
    fallback: null,
    transformers: [],
    dynamic: false
  };
};

const getTokenWithoutTransformer = (expression: string, token: Token): Token => {
  if (hasFallback(expression)) {
    const [body, fallback] = splitStringByIndex(expression, expression.indexOf(FALLBACK_DELIMITER));
    token.body = body;
    token.fallback = fallback;
  } else {
    token.body = expression;
  }
  return token;
};

const getTokenWithTransformer = (expression: string, token: Token): Token => {
  const [remaining, modifier] = splitStringByIndex(expression, expression.lastIndexOf(TRANSFORMER_DELIMITER));

  token.transformers.push(modifier);

  return hasTransformer(remaining)
    ? getTokenWithTransformer(remaining, token)
    : getTokenWithoutTransformer(remaining, token);
};

const getDynamicToken = (expression: string): Token => {
  const rawExpression = stripTemplateLiterals(expression);

  const token = {
    body: null,
    transformers: [],
    fallback: null,
    dynamic: true,
  };

  return hasTransformer(rawExpression)
    ? getTokenWithTransformer(rawExpression, token)
    : getTokenWithoutTransformer(rawExpression, token);
};

const normalizeToken = (token: Token): Token => {
  return {
    body: token.body,
    transformers: token.transformers.filter(Boolean).reverse(),
    fallback: token.fallback,
    dynamic: token.dynamic,
  };
};

export const tokenize = (expression: string): Token => {
  const token = isDynamicToken(expression)
    ? getDynamicToken(expression)
    : getStaticToken(expression);

  return normalizeToken(token);
};
