import { TypeUtils } from '@fluentfixture/shared';
import { TokenMetadata } from './types/token-metadata';

/**
 * `TokenParser` accepts a token and creates a token metadata.
 * @class
 */
export class TokenParser {
  private static readonly PipeCharacter = '|';
  private static readonly FallbackCharacter = ':';

  /**
   * Parses the given token and creates a token metadata.
   * @public
   * @param {string} [token] - token as string
   * @returns {TokenMetadata}
   */
  public parse(token: string): TokenMetadata {
    const expression = token.slice(1, -1);
    const indexOfFallbackCharacter = expression.indexOf(TokenParser.FallbackCharacter);
    const indexOfPipeCharacter = expression.indexOf(TokenParser.PipeCharacter);
    const hasFallback = indexOfFallbackCharacter > -1 && (indexOfPipeCharacter === -1 || indexOfFallbackCharacter < indexOfPipeCharacter);
    const metadata = {
      path: undefined,
      fallback: undefined,
      generators: undefined
    };
    if (hasFallback) {
      const [path, remaining] = TokenParser.split(expression, indexOfFallbackCharacter);
      const parts = remaining.split(TokenParser.PipeCharacter);
      metadata.path = TokenParser.getTokenPath(path);
      metadata.fallback = parts[0];
      metadata.generators = TokenParser.getTokenGenerators(parts.slice(1));
    } else {
      const parts = expression.split(TokenParser.PipeCharacter);
      metadata.path = TokenParser.getTokenPath(parts[0]);
      metadata.generators = TokenParser.getTokenGenerators(parts.slice(1));
    }

    return metadata;
  }

  private static getTokenPath(expression: string): string | undefined {
    return TypeUtils.isNonBlankString(expression) ? expression.trim() : undefined;
  }

  private static getTokenGenerators(expressions: Array<string>): ReadonlyArray<string> {
    return expressions.map(e => e.trim()).filter(e => TypeUtils.isNonBlankString(e));
  }

  private static split(expression: string, index: number): [string, string] {
    return [expression.slice(0, index).trim(), expression.slice(index + 1).trim()];
  }
}
