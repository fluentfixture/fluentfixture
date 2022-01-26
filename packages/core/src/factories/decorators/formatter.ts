import { CompiledFormatter } from '@fluentfixture/format';
import { IFactory } from '../interfaces/factory';
import { Assert } from '../../utils/assert';
import { FormatHelper } from '../../helpers/format-helper';
import { Decorator } from './decorator';

/**
 * `Formatter` decorator decorates a factory with the given template.
 * When the `single()` method is invoked, it generates data using the decorated factory
 * produces a string using the template engine with the given template and the output.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/decorators|Decorators}
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/decorators/formatter|Docs}
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/fundamentals/templates|Templates}
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
   * @param {IFactory.<T>} [factory] - the factory to be decorated
   * @param {string} [template] - the template expression
   */
  public constructor(factory: IFactory<T>, template: string) {
    Assert.isNonEmptyString('Formatter.constructor(factory, template)', 'template', template);
    super(factory);
    this.template = template;
    this.formatter = FormatHelper.compile(template);
  }
  /**
   *
   * Generates single data by using the decorated factory and the given template.
   * @see IFactory
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
