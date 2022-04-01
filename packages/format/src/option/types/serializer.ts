import { PipeFunction } from '../../pipes/types/pipe-function';

export type Serializer<T = any> = string | PipeFunction<T, string>;
