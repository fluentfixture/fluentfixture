/**
 * `TokenMetadata` defines raw information about a token.
 * @interface
 */
export interface TokenMetadata {
  /**
   * Query of the token.
   */
  query: string | undefined;

  /**
   * Fallback of the token.
   */
  fallback: string | undefined;

  /**
   * Pipe list of the token.
   */
  pipes: ReadonlyArray<string>;
}
