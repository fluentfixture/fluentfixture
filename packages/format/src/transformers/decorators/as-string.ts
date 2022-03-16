import { TypeUtils } from '@fluentfixture/shared';
import { Transformer } from '../../types/transformer';

export const asString = (transformer: Transformer): Transformer => {
  return (input: any) => {
    const transformed = TypeUtils.isString(input)
      ? input
      : TypeUtils.isAssigned(input) ? input.toString() : '';
    return transformer(transformed);
  }
}
