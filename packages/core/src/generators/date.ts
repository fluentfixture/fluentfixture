import { DateUtils } from '@fluentfixture/shared';
import { DateStream } from '../streams/stream-loader';
import { asDate } from './converters';
import { from } from './value';

export const date = (min: Date = DateUtils.getToday(), max: Date = DateUtils.getTomorrow()) => DateStream.between(min, max);

const NOW = asDate(from(() => DateUtils.now()));
const TOMORROW = asDate(from(() => DateUtils.getTomorrow()));
const YESTERDAY = asDate(from(() => DateUtils.getYesterday()));

export const now = (): DateStream => NOW;
export const tomorrow = (): DateStream => TOMORROW;
export const yesterday = (): DateStream => YESTERDAY;
