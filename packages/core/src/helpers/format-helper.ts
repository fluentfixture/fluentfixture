import { Formatter, CompiledFormatter } from '@fluentfixture/format';

export class FormatHelper {
  private static readonly formatter = Formatter.create();

  public static compile(template: string): CompiledFormatter {
    return FormatHelper.formatter.compile(template);
  }
}


