import { CompiledTemplate } from '@fluentfixture/format';
import { Assert } from '../../assertions/assert';
import { FormatHelper } from '../../helpers/format-helper';
import { Factory } from '../factory';
import { Decorator } from './decorator';

/**
 * @todo: change sign of compiled template
 */

/**
 * `Formatter` decorator decorates a factory with the given template.
 * When the `single()` method is invoked, it generates data using the decorated factory
 * produces a string using the template engine with the given template and the output.
 * @class
 * @template T
 * @extends Decorator.<T,string>
 */
export class Formatter<T = any> extends Decorator<T, string> {
  private readonly template: string;
  private readonly compiled: CompiledTemplate;

  /**
   * Creates an instance of `Formatter`.
   * @constructor
   * @param {Factory.<T>} [factory] - the factory to be decorated
   * @param {string} [template] - the template expression
   */
  public constructor(factory: Factory<T>, template: string) {
    Assert.isNonEmptyString('Formatter.constructor(factory, template)', 'template', template);
    super(factory);
    this.template = template;
    this.compiled = FormatHelper.compileTemplate(template);
  }

  /**
   *
   * Generates single data by using the decorated factory and the given template.
   * @see Factory
   * @public
   * @returns {string}
   */
  public single(): string {
    return this.compiled.format(this.factory.single() as any);
  }

  /**
   * Returns the template expression.
   * @public
   * @returns {string}
   */
  public getTemplate(): string {
    return this.template;
  }
}
