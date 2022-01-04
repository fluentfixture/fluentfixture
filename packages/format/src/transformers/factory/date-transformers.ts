import { TransformerFactory } from '../../types/transformer-factory';

export const addBuiltInDateTransformers = (factory: TransformerFactory): void => {
  factory.setTransformer('iso-date', (date: Date) => date.toISOString());
}
