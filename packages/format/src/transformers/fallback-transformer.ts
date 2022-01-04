import { Transformer } from '../types/transformer';
import { isAssigned } from '../utils/type-checks';

export const getFallbackTransformer = (fallback: string): Transformer => {
  return (input: any) => isAssigned(input) ? input : fallback;
}
