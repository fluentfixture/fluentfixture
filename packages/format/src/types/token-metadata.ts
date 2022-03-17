/**
 * `TokenMetadata` defines raw information about a token.
 * @interface
 */
export interface TokenMetadata {
  /**
   * Path of the token.
   */
  path: string | undefined;

  /**
   * Fallback of the token.
   */
  fallback: string | undefined;

  /**
   * Generator list of the token.
   */
  generators: ReadonlyArray<string>;
}
