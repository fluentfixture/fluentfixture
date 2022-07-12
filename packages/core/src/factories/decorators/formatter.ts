import { Template } from '@fluentfixture/format';
import { Assert } from '../../assertions/assert';
import { FormatHelper } from '../../helpers/format-helper';
import { Factory } from '../factory';
import { Decorator } from './decorator';

export class Formatter<T = any> extends Decorator<T, string> {
  private readonly template: string;
  private readonly compiled: Template;

  public constructor(factory: Factory<T>, template: string) {
    Assert.isNonEmptyString('Formatter.constructor(factory, template)', 'template', template);
    super(factory);
    this.template = template;
    this.compiled = FormatHelper.compile(template);
  }

  public single(): string {
    return this.compiled.format(this.factory.single());
  }

  public getTemplate(): string {
    return this.template;
  }
}
