import { CompiledFormatter } from '@fluentfixture/format';
import { IFactory } from '../interfaces/factory';
import { Assert } from '../../utils/assert';
import { FormatHelper } from '../../helpers/format-helper';
import { Decorator } from './decorator';

export class Formatter<T = any> extends Decorator<T, string> {
  private readonly template: string;
  private readonly formatter: CompiledFormatter;

  public constructor(factory: IFactory<T>, template: string) {
    Assert.isNonEmptyString('Formatter.constructor(factory, template)', 'template', template);
    super(factory);
    this.template = template;
    this.formatter = FormatHelper.compile(template);
  }

  public single(): string {
    return this.formatter(this.factory.single());
  }

  public getTemplate(): string {
    return this.template;
  }
}
