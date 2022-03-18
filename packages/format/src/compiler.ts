import { CompiledTemplate } from './parsers/compiled-template';
import { createParser } from './bootstrapper';
import { Options } from './parsers/types/options';

/**
 * Creates a compiled template by using the given template.
 * @public
 * @param {string} [template] - template literal
 * @param {Options=} [options] - template options
 * @returns {CompiledTemplate}
 */
export const compile = (template: string, options?: Options): CompiledTemplate => new CompiledTemplate(createParser(options).parse(template));
