import { CompiledFormatter } from '@fluentfixture/format';
import { IFactory } from '../interfaces/factory';
import { Assert } from '../../utils/assert';
import { FormatHelper } from '../../helpers/format-helper';
import { Converter } from './converter';

export class Formatter<T = any> extends Converter<T, string> {
  private readonly template: string;
  private readonly formatter: CompiledFormatter;

  public constructor(factory: IFactory<T>, template: string) {
    Assert.nonEmptyString(template);
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
