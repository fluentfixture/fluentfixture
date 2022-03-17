import { CompiledTemplate } from './parsers/compiled-template';
import { parser } from './bootstrapper';

/**
 * Formats the given source object with the give template directly.
 * @public
 * @param {string} [template] - template literal
 * @param {object} [source] - source object
 * @returns {string}
 */
export const format = (template: string, source: object): string => new CompiledTemplate(parser.parse(template)).format(source);
