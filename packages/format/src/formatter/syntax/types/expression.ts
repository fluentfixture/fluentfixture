import { PipeDefinition } from './pipe-definition';
import { PathDefinition } from './path-definition';

export interface Expression {
  path?: PathDefinition;
  pipes: ReadonlyArray<PipeDefinition>;
}
