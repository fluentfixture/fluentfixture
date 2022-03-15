import { DateStream } from '../streams/stream-loader';
import { DateHelper } from '../helpers/date-helper';

/**
 * Creates a `DateStream` that generates a date within the given boundary.
 * @see DateStream
 * @public
 * @param {Date} [min=now] - the minimum of the boundary
 * @param {Date} [max=tomorrow] - the maximum of the boundary
 * @returns {DateStream}
 */
export const date = (min: Date = DateHelper.getToday(), max: Date = DateHelper.getTomorrow()) => DateStream.between(min, max);

/**
 * Creates a `DateStream` that generates a date that is the date of now.
 * @see DateStream
 * @public
 * @returns {DateStream}
 */
export const now = (): DateStream => DateStream.fromDate(DateHelper.now());

/**
 * Creates a `DateStream` that generates a date that is the date of tomorrow.
 * @see DateStream
 * @public
 * @returns {DateStream}
 */
export const tomorrow = (): DateStream => DateStream.fromDate(DateHelper.getTomorrow());

/**
 * Creates a `DateStream` that generates a date that is the date of yesterday.
 * @see DateStream
 * @public
 * @returns {DateStream}
 */
export const yesterday = (): DateStream => DateStream.fromDate(DateHelper.getYesterday());
