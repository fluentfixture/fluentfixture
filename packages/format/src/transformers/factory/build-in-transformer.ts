import { createTransformerFactory } from './transformer-factory';
import { addBuiltInStringTransformers } from './string-transformers';
import { addBuiltInDateTransformers } from './date-transformers';

const factory = createTransformerFactory();

addBuiltInDateTransformers(factory);
addBuiltInStringTransformers(factory);

export const transformers = factory;
