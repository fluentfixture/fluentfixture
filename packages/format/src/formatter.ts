import { CompiledTemplate } from './parsers/compiled-template';
import { Options } from './parsers/types/options';
import { createParser } from './bootstrapper';

/**
 * Formats the given source object with the give template directly.
 * @public
 * @param {string} [template] - template literal
 * @param {*} [source] - source object
 * @param {Options=} [options] - options
 * @returns {string}
 */
export const format = (template: string, source: any, options?: Options): string => new CompiledTemplate(createParser(options).parse(template)).format(source);
