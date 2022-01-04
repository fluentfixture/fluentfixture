import { Transformer } from '../types/transformer';

export const getStaticTransformer = (input: any): Transformer => {
  return () => input;
};
