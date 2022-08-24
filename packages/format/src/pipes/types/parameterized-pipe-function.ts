import { PipeFunction } from './pipe-function';

export interface ParameterizedPipeFunction<T = any, K = any> {
  fn: PipeFunction<T, K>;
  parameters: ReadonlyArray<any>;
}
