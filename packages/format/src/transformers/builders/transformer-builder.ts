import { TransformerFactory } from '../../types/transformer-factory';
import { Transformer } from '../../types/transformer';
import { getStaticTransformer } from '../static-transformer';
import { isAssigned, isString } from '../../utils/type-checks';
import { getNoopTransformer } from '../noop-transformer';
import { getDynamicTransformer } from '../dynamic-transformer';
import { getFallbackTransformer } from '../fallback-transformer';
import { errorBoundary } from '../decorators/error-boundary';
import { asString } from '../decorators/as-string';
import { tokenize } from '../../tokens/tokenizer';
import { Token } from '../../types/token';

const isStaticToken = (token: Token): boolean => !token.dynamic;

const isIdentityToken = (token: Token): boolean => isString(token.body) && token.body.length === 0;

const getTransformersForStaticToken = (token : Token): Transformer => getStaticTransformer(token.body);

const getTransformersForDynamicToken = (token : Token, factory: TransformerFactory): Transformer => {
  const transformers = [
    isIdentityToken(token) ? getNoopTransformer() : getDynamicTransformer(token.body),
    getFallbackTransformer(isAssigned(token.fallback) ? token.fallback : undefined),
    ...token.transformers.map(i => factory.getTransformer(i)),
    asString(getNoopTransformer())
  ];

  return errorBoundary((input: any) => {
    let result = input;
    for (const transformer of transformers) {
      result = transformer(result);
    }
    return result;
  });
}

export const build = (expression: string, factory: TransformerFactory): Transformer => {
  const token = tokenize(expression);

  return isStaticToken(token)
    ? getTransformersForStaticToken(token)
    : getTransformersForDynamicToken(token, factory);
};
