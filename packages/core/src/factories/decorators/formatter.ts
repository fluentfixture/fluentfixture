import { CompiledFormatter } from '@fluentfixture/format';
import { IFactory } from '../interfaces/factory';
import { Assert } from '../../utils/assert';
import { FormatHelper } from '../../helpers/format-helper';
import { Decorator } from './decorator';

/**
 * The `Formatter` decorator is a utility decorator that formats the result of the underlying factory with the given template.
 * The syntax of the template is covered in the Templates section.
 * The `Formatter` decorator does not store a state and does not alter the result of the given factory.
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
   * Generates a data by using the decorated `Factory`.
   * @see IFactory
   * @returns {string}
   */
  public single(): string {
    return this.formatter(this.factory.single());
  }

  /**
   * Returns the template expression
   * @returns {string}
   */
  public getTemplate(): string {
    return this.template;
  }
}
