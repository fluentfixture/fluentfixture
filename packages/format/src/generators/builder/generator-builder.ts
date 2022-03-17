import { Identity } from '../identity';
import { Extractor } from '../extractor';
import { Flow } from '../flow';
import { Generator } from '../generator';
import { GeneratorFactory } from '../factory/generator-factory';
import { Stringifier } from '../stringifier';
import { TokenParser } from '../../parsers/token-parser';
import { Fixed } from '../fixed';
import { Fallback } from '../fallback';

/**
 * `GeneratorBuilder` builds a generator flow by using the token.
 * @class
 */
export class GeneratorBuilder {
  private readonly parser: TokenParser;
  private readonly factory: GeneratorFactory;

  /**
   * Creates an instance of `GeneratorBuilder`.
   * @constructor
   * @param {TokenParser} [parser] - token parser instance
   * @param {GeneratorFactory} [factory] - generator factory instance
   */
  public constructor(parser: TokenParser, factory: GeneratorFactory) {
    this.parser = parser;
    this.factory = factory;
  }

  /**
   * Creates a static generator.
   * @public
   * @param {string} [token] - token
   * @returns {Generator.<*,string>}
   */
  public buildStatic(token: string): Generator<any, string> {
    return new Fixed(token);
  }

  /**
   * Creates a generator flow.
   * @public
   * @param {string} [token] - token
   * @returns {Generator.<*,string>}
   */
  public buildDynamic(token: string): Generator<any, string> {
    const metadata = this.parser.parse(token);
    const generators = [metadata.path ? new Extractor(metadata.path) : new Identity()];

    if (metadata.fallback) {
      generators.push(new Fallback(metadata.fallback));
    }

    for (const generator of metadata.generators) {
      generators.push(this.factory.getGenerator(generator));
    }

    generators.push(new Stringifier());

    return new Flow(generators);
  }
}
