import { DEFAULT_MAX_NUMBER, DEFAULT_MIN_NUMBER } from '../constants/limits';
import { NumberStream } from '../streams/stream-loader';
import { IntegerFactory } from '../factories/integer-factory';
import { Random } from '../engine/random';
import { asNumber } from './converters';
import { from } from './value';

export const real = (min: number = DEFAULT_MIN_NUMBER, max: number = DEFAULT_MAX_NUMBER): NumberStream => NumberStream.between(min, max);

export const int = (min: number = DEFAULT_MIN_NUMBER, max: number = DEFAULT_MAX_NUMBER): NumberStream => new NumberStream(new IntegerFactory(min, max));

export const num = (val: number): NumberStream => NumberStream.constant(val);

export const zero = (): NumberStream => NumberStream.constant(0);

export const one = (): NumberStream => NumberStream.constant(1);

export const byte = (): NumberStream => NumberStream.between(0, 255);

export const int32 = (): NumberStream => asNumber(from(() => Random.int32()));

export const uint32 = (): NumberStream => asNumber(from(() => Random.uint32()));
