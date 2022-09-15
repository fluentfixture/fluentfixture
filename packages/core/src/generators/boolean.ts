import { DEFAULT_PERCENTAGE } from '../constants/limits';
import { BooleanStream } from '../streams/stream-loader';

export const bool = (percentage: number = DEFAULT_PERCENTAGE): BooleanStream => BooleanStream.fromPercentage(percentage);

const TRUTHY = BooleanStream.truthy();
const FALSY = BooleanStream.falsy();

export const truthy = (): BooleanStream => TRUTHY;
export const falsy = (): BooleanStream => FALSY;
