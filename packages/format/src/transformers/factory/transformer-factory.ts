import { Transformer } from '../../types/transformer';
import { TransformerFactory } from '../../types/transformer-factory';
import { isFunction, isNonBlankString } from '../../utils/type-checks';
import { errorBoundary } from '../decorators/error-boundary';

export const createTransformerFactory = (): TransformerFactory => {
  const transformers = new Map<string, Transformer>();

  const getTransformer = (name: string): Transformer => {
    if (transformers.has(name)) {
      return transformers.get(name);
    }
    throw new Error(`Cannot find transformer with name: ${name}!`);
  };

  const setTransformer = (name: string, transformer: Transformer): void => {
    if (!isNonBlankString(name)) {
      throw new Error(`Cannot register transformer with name: ${name}!`);
    }
    if (!isFunction(transformer)) {
      throw new Error('Transformer must be a function!');
    }
    if (transformers.has(name)) {
      throw new Error(`Transformer with name: ${name} already registered!`);
    }
    transformers.set(name.trim(), errorBoundary(transformer));
  };

  return {
    getTransformer, setTransformer
  };
};

