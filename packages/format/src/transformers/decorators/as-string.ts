import { Transformer } from '../../types/transformer';
import { isAssigned, isString } from '../../utils/type-checks';

export const asString = (transformer: Transformer): Transformer => {
  return (input: any) => {
    const transformed = isString(input)
      ? input
      : isAssigned(input) ? input.toString() : '';
    return transformer(transformed);
  }
}
