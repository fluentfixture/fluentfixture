import * as path from 'object-path';
import { Transformer } from '../types/transformer';

export const getDynamicTransformer = (expression: string): Transformer => {
  return (input: any) => path.get(input, expression);
};
