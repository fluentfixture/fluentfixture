import { TypeUtils } from '@fluentfixture/shared';
import { uuid4, int32, uint32, byte, now, tomorrow, yesterday } from '../../src/generators/generators';
import { DateStream, NumberStream, StringStream } from '../../src/streams/stream-loader';

/**
 * This a simple integration test for the decorated generators with asString, asNumber etc...
 * There is no need to test n-depth decoration again.
 */

describe('adapted generators', () => {

  it('should return the result of the correct stream type', () => {

    expect(uuid4()).toBeInstanceOf(StringStream);
    expect(TypeUtils.isString(uuid4().single())).toBe(true);

    expect(int32()).toBeInstanceOf(NumberStream);
    expect(TypeUtils.isInteger(int32().single())).toBe(true);

    expect(uint32()).toBeInstanceOf(NumberStream);
    expect(TypeUtils.isInteger(uint32().single())).toBe(true);

    expect(byte()).toBeInstanceOf(NumberStream);
    expect(TypeUtils.isInteger(byte().single())).toBe(true);

    expect(now()).toBeInstanceOf(DateStream);
    expect(TypeUtils.isDate(now().single())).toBe(true);

    expect(tomorrow()).toBeInstanceOf(DateStream);
    expect(TypeUtils.isDate(tomorrow().single())).toBe(true);

    expect(yesterday()).toBeInstanceOf(DateStream);
    expect(TypeUtils.isDate(yesterday().single())).toBe(true);
  });
});
