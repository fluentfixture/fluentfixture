import { compile, CompiledFormatter } from '@fluentfixture/format';

export class FormatUtils {

  public static compile(template: string): CompiledFormatter {
    return compile(template);
  }
}


