import { compile, CompiledTemplate } from '@fluentfixture/format';

export class FormatHelper {

  public static compileTemplate(template: string): CompiledTemplate {
    return compile(template);
  }
}


