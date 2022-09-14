import { uuid4, int32, uint32, byte } from '../../src/generators/generators';
import { NumberStream, StringStream } from '../../src/streams/stream-loader';

/**
 * This a simple integration test for the decorated generators with asString, asNumber etc...
 * There is no need to test n-depth decoration again.
 */

describe('adapted generators', () => {

  it('should return the result of the correct stream type', () => {

    expect(uuid4()).toBeInstanceOf(StringStream);
    expect(typeof uuid4().single()).toBe('string');

    expect(int32()).toBeInstanceOf(NumberStream);
    expect(typeof int32().single()).toBe('number');

    expect(uint32()).toBeInstanceOf(NumberStream);
    expect(typeof uint32().single()).toBe('number');

    expect(byte()).toBeInstanceOf(NumberStream);
    expect(typeof byte().single()).toBe('number');
  });
});
