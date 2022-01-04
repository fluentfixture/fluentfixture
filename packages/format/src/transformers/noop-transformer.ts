import { Transformer } from '../types/transformer';

export const getNoopTransformer = (): Transformer => {
  return (input: any) => input;
}
