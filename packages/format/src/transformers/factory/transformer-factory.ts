import { TypeUtils } from '@fluentfixture/shared';
import { Transformer } from '../../types/transformer';
import { TransformerFactory } from '../../types/transformer-factory';
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
    if (!TypeUtils.isNonBlankString(name)) {
      throw new Error(`Cannot register transformer with name: ${name}!`);
    }
    if (!TypeUtils.isFunction(transformer)) {
      throw new TypeError('Transformer must be a function!');
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

