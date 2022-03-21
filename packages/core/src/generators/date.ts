import { DateUtils } from '@fluentfixture/shared';
import { DateStream } from '../streams/stream-loader';

/**
 * Creates a `DateStream` that generates a date within the given boundary.
 * @see DateStream
 * @public
 * @param {Date} [min=now] - the minimum of the boundary
 * @param {Date} [max=tomorrow] - the maximum of the boundary
 * @returns {DateStream}
 */
export const date = (min: Date = DateUtils.getToday(), max: Date = DateUtils.getTomorrow()) => DateStream.between(min, max);

/**
 * Creates a `DateStream` that generates a date that is the date of now.
 * @see DateStream
 * @public
 * @returns {DateStream}
 */
export const now = (): DateStream => DateStream.fromDate(DateUtils.now());

/**
 * Creates a `DateStream` that generates a date that is the date of tomorrow.
 * @see DateStream
 * @public
 * @returns {DateStream}
 */
export const tomorrow = (): DateStream => DateStream.fromDate(DateUtils.getTomorrow());

/**
 * Creates a `DateStream` that generates a date that is the date of yesterday.
 * @see DateStream
 * @public
 * @returns {DateStream}
 */
export const yesterday = (): DateStream => DateStream.fromDate(DateUtils.getYesterday());
