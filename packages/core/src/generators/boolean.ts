import { DEFAULT_PERCENTAGE } from '../constants/limits';
import { BooleanStream } from '../streams/stream-loader';

const TRUTHY = BooleanStream.truthy();
const FALSY = BooleanStream.falsy();

export const bool = (percentage: number = DEFAULT_PERCENTAGE): BooleanStream => BooleanStream.fromPercentage(percentage);
export const truthy = (): BooleanStream => TRUTHY;
export const falsy = (): BooleanStream => FALSY;
