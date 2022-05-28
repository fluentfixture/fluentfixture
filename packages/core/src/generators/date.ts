import { DateUtils } from '@fluentfixture/shared';
import { DateStream } from '../streams/stream-loader';

export const date = (min: Date = DateUtils.getToday(), max: Date = DateUtils.getTomorrow()) => DateStream.between(min, max);

export const now = (): DateStream => DateStream.fromDate(DateUtils.now());

export const tomorrow = (): DateStream => DateStream.fromDate(DateUtils.getTomorrow());

export const yesterday = (): DateStream => DateStream.fromDate(DateUtils.getYesterday());
