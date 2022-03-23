import { PipeFunction } from '../../pipes/types/pipe-function';

export type DefaultPipe<T = any> = string | PipeFunction<T>;
