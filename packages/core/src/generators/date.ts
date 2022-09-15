import { DateUtils } from '@fluentfixture/shared';
import { DateStream } from '../streams/stream-loader';
import { asDate } from './converters';
import { from } from './value';

export const date = (min: Date = DateUtils.getToday(), max: Date = DateUtils.getTomorrow()) => DateStream.between(min, max);

export const tomorrow = (): DateStream => DateStream.fromDate(DateUtils.getTomorrow());

export const yesterday = (): DateStream => DateStream.fromDate(DateUtils.getYesterday());

const NOW = asDate(from(() => DateUtils.now()))

export const now = (): DateStream => NOW;
