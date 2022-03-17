import { CompiledTemplate } from './parsers/compiled-template';
import { parser } from './bootstrapper';

/**
 * Creates a compiled template by using the given template.
 * @public
 * @param {string} [template] - template literal
 * @returns {CompiledTemplate}
 */
export const compile = (template: string): CompiledTemplate => new CompiledTemplate(parser.parse(template));
