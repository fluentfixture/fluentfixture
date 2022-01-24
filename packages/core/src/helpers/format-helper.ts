import { compile, CompiledFormatter } from '@fluentfixture/format';

export class FormatHelper {

  public static compile(template: string): CompiledFormatter {
    return compile(template);
  }
}


