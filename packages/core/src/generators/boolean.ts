import { DEFAULT_PERCENTAGE } from '../constants/limits';
import { BooleanStream } from '../streams/stream-loader';

/**
 * Creates a `BooleanStream` that generates always false.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/boolean-generators#falsy|Docs}
 * @see BooleanStream
 * @returns {BooleanStream}
 */
export const falsy = (): BooleanStream => BooleanStream.falsy();

/**
 * Creates a `BooleanStream` that generates always true.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/boolean-generators#truthy|Docs}
 * @see BooleanStream
 * @returns {BooleanStream}
 */
export const truthy = (): BooleanStream => BooleanStream.truthy();

/**
 * Creates a `BooleanStream` that generates a boolean with the given percentage.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/boolean-generators#bool|Docs}
 * @see BooleanStream
 * @param {number} [percentage=0.5] - a number within [0, 1] of how often the result should be true.
 * @returns {BooleanStream}
 */
export const bool = (percentage: number = DEFAULT_PERCENTAGE): BooleanStream => BooleanStream.fromPercentage(percentage);
