import { Formatter, Template } from '@fluentfixture/format';

export class FormatHelper {
  private static readonly formatter = Formatter.create();

  public static compile(template: string): Template {
    return FormatHelper.formatter.compile(template);
  }
}
