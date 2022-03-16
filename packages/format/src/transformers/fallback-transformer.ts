import { TypeUtils } from '@fluentfixture/shared';
import { Transformer } from '../types/transformer';

export const getFallbackTransformer = (fallback: string): Transformer => {
  return (input: any) => TypeUtils.isAssigned(input) ? input : fallback;
}
