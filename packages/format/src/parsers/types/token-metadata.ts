export interface TokenMetadata {
  query: string | undefined;
  fallback: string | undefined;
  pipes: ReadonlyArray<string>;
}
