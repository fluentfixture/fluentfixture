import { PipeDefinition } from './pipe-definition';

export interface SyntaxDefinition {
  path?: string;
  pipes: ReadonlyArray<PipeDefinition>
}
