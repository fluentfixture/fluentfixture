import { Identity } from '../identity';
import { Extractor } from '../extractor';
import { Flow } from '../flow';
import { Generator } from '../generator';
import { GeneratorFactory } from '../factory/generator-factory';
import { Stringifier } from '../stringifier';
import { TokenParser } from '../../parsers/token-parser';
import { Fixed } from '../fixed';
import { Fallback } from '../fallback';
import { Options } from '../../parsers/types/options';
import { ErrorBoundary } from '../error-boundary';
import { TokenMetadata } from '../../parsers/types/token-metadata';

/**
 * `GeneratorBuilder` builds a generator flow by using the token.
 * @class
 */
export class GeneratorBuilder {
  private readonly parser: TokenParser;
  private readonly factory: GeneratorFactory;
  private readonly options: Options;

  /**
   * Creates an instance of `GeneratorBuilder`.
   * @constructor
   * @param {TokenParser} [parser] - token parser instance
   * @param {GeneratorFactory} [factory] - generator factory instance
   * @param {Options} [options] - options
   */
  public constructor(parser: TokenParser, factory: GeneratorFactory, options: Options) {
    this.parser = parser;
    this.factory = factory;
    this.options = options;
  }

  /**
   * Creates a static generator.
   * @public
   * @param {string} [token] - token
   * @returns {Generator.<*,string>}
   */
  public fixed(token: string): Generator<any, string> {
    return new Fixed(token);
  }

  /**
   * Creates a generator flow.
   * @public
   * @param {string} [token] - token
   * @returns {Generator.<*,string>}
   */
  public flow(token: string): Generator<any, string> {
    const metadata = this.parser.parse(token);
    const generators = [GeneratorBuilder.getInitialGenerator(metadata)];

    if (metadata.fallback) {
      generators.push(new Fallback(metadata.fallback));
    }

    for (const generator of metadata.generators) {
      generators.push(this.getSafeGenerator(this.factory.get(generator)));
    }

    generators.push(new Stringifier());

    return new Flow(generators);
  }

  private getSafeGenerator(generator: Generator): Generator {
    return this.options.ignoreErrors ? new ErrorBoundary(generator) : generator;
  }

  private static getInitialGenerator(metadata: TokenMetadata): Generator {
    return metadata.path ? new Extractor(metadata.path) : new Identity();
  }
}
