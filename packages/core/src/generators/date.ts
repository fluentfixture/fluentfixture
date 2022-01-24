import { DateStream } from '../streams/stream-loader';
import { DateHelper } from '../helpers/date-helper';

/**
 * Creates a `DateStream` that generates a date with the given boundaries.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/date-generators#date-min-max|Docs}
 * @see DateStream
 * @param {Date} [min=now] - the minimum of the boundary
 * @param {Date} [max=tomorrow] - the maximum of the boundary
 * @returns {DateStream}
 */
export const date = (min: Date = DateHelper.getToday(), max: Date = DateHelper.getTomorrow()) => DateStream.between(min, max);

/**
 * Creates a `DateStream` that generates a date that is the date of now.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/date-generators#now|Docs}
 * @see DateStream
 * @returns {DateStream}
 */
export const now = (): DateStream => DateStream.fromDate(DateHelper.now());

/**
 * Creates a `DateStream` that generates a date that is the date of tomorrow.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/date-generators#tomorrow|Docs}
 * @see DateStream
 * @returns {DateStream}
 */
export const tomorrow = (): DateStream => DateStream.fromDate(DateHelper.getTomorrow());

/**
 * Creates a `DateStream` that generates a date that is the date of yesterday.
 * @see {@link https://scokmen.gitbook.io/fluent-fixture/concepts/generators/date-generators#yesterday|Docs}
 * @see DateStream
 * @returns {DateStream}
 */
export const yesterday = (): DateStream => DateStream.fromDate(DateHelper.getYesterday());
