import { Formatter, Pipes, Template } from '@fluentfixture/format';

export class FormatHelper {
  private static readonly formatter = Formatter.create(Pipes.withDefaults());

  public static compile(template: string): Template {
    return FormatHelper.formatter.compile(template);
  }
}
