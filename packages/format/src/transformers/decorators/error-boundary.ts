import { Transformer } from '../../types/transformer';

export const errorBoundary = (transformer: Transformer): Transformer => {
  return (input: any) => {
    try {
      return transformer(input);
    } catch {
      return;
    }
  }
}
