import { DEFAULT_MAX_NUMBER, DEFAULT_MIN_NUMBER } from '../constants/limits';
import { NumberStream } from '../streams/stream-loader';
import { IntegerFactory } from '../factories/integer-factory';
import { Random } from '../engine/random';
import { asNumber } from './converters';
import { from } from './value';

export const real = (min: number = DEFAULT_MIN_NUMBER, max: number = DEFAULT_MAX_NUMBER): NumberStream => NumberStream.between(min, max);

export const int = (min: number = DEFAULT_MIN_NUMBER, max: number = DEFAULT_MAX_NUMBER): NumberStream => new NumberStream(new IntegerFactory(min, max));

export const num = (val: number): NumberStream => NumberStream.constant(val);

const ZERO = NumberStream.constant(0);
const ONE = NumberStream.constant(1);
const BYTE = new NumberStream(new IntegerFactory(0, 255));
const INT_32 = asNumber(from(() => Random.int32()));
const UINT_32 = asNumber(from(() => Random.uint32()));

export const zero = (): NumberStream => ZERO;
export const one = (): NumberStream => ONE;
export const byte = (): NumberStream => BYTE;
export const int32 = (): NumberStream => INT_32;
export const uint32 = (): NumberStream => UINT_32;
