import { CompiledFormatter } from '@fluentfixture/format';
import { Assert } from '../../assertions/assert';
import { FormatHelper } from '../../helpers/format-helper';
import { Factory } from '../factory';
import { Decorator } from './decorator';

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
  private readonly formatter: CompiledFormatter;

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
    this.formatter = FormatHelper.compile(template);
  }
  /**
   *
   * Generates single data by using the decorated factory and the given template.
   * @see Factory
   * @public
   * @returns {string}
   */
  public single(): string {
    return this.formatter(this.factory.single());
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
