import { Transformer } from './transformer';

export type TransformerFactory = {
  getTransformer(name: string): Transformer;
  setTransformer(name: string, transformer: Transformer): void;
};
