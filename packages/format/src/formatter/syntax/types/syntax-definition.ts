import { PipeDefinition } from './pipe-definition';
import { PathDefinition } from './path-definition';

export interface SyntaxDefinition {
  path?: PathDefinition;
  pipes: ReadonlyArray<PipeDefinition>;
}
