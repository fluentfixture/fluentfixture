import { CompiledFormatter} from './types/compiled-formatter';
import { compileToTransformers } from './template-parser';
import { transformers } from './transformers/factory/build-in-transformer';

export const compile = (template: string): CompiledFormatter => {
  const evaluators = compileToTransformers(template, transformers);
  return (source: any) => {
    let result = '';
    for (const evaluator of evaluators) {
      result += evaluator(source);
    }
    return result;
  }
}
