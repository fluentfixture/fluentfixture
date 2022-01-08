import { DEFAULT_PERCENTAGE } from '../constants/limits';
import { BooleanStream } from '../streams/stream-loader';

export const falsy = (): BooleanStream => BooleanStream.falsy();

export const truthy = (): BooleanStream => BooleanStream.truthy();

export const bool = (percentage: number = DEFAULT_PERCENTAGE): BooleanStream => BooleanStream.fromPercentage(percentage);
