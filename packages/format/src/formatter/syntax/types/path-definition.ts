export interface PathDefinition {
  type: 'PROPERTY' | 'FUNCTION';
  value: string;
  parameters: ReadonlyArray<any>;
}
