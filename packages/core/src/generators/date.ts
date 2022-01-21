import { DateStream } from '../streams/stream-loader';
import { DateUtils } from '../utils/date-utils';

/**
 * Creates a `DateStream` that generates a date with the given boundaries.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/date-generators#date-min-max|Docs}
 * @param {Date} [min=now] - the minimum of the boundary
 * @param {Date} [max=tomorrow] - the maximum of the boundary
 * @returns {DateStream} DateStream
 */
export const date = (min: Date = DateUtils.getToday(), max: Date = DateUtils.getTomorrow()) => DateStream.between(min, max);

/**
 * Creates a `DateStream` that generates a date that is the date of now.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/date-generators#now|Docs}
 * @returns {DateStream} DateStream
 */
export const now = (): DateStream => DateStream.fromDate(DateUtils.now());

/**
 * Creates a `DateStream` that generates a date that is the date of tomorrow.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/date-generators#tomorrow|Docs}
 * @returns {DateStream} DateStream
 */
export const tomorrow = (): DateStream => DateStream.fromDate(DateUtils.getTomorrow());

/**
 * Creates a `DateStream` that generates a date that is the date of yesterday.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/date-generators#yesterday|Docs}
 * @returns {DateStream} DateStream
 */
export const yesterday = (): DateStream => DateStream.fromDate(DateUtils.getYesterday());
