import { Generator } from './generator';
import { Flow } from './flow';
import { Functional } from './functional';
import { GeneratorFunction } from './types/generator-function';

/**
 * Combines the given generators.
 * @see Flow
 * @public
 * @param {Generator[]} generators - generator list
 * @returns {Generator}
 */
export const combine = (...generators: Generator[]): Generator => new Flow(generators);

/**
 * Creates a generator by using the given generator function
 * @see Functional
 * @public
 * @param {function(*):*} generator - generator function
 * @returns {Generator}
 */
export const asGenerator = (generator: GeneratorFunction): Generator => new Functional(generator);
