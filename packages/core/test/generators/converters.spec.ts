import { val } from '../../src/generators/generators';
import { NumberStream, StringStream } from '../../src/streams/stream-loader';
import { asNumber, asString } from '../../src/generators/converters';

describe('converters', () => {

  describe('asString()', () => {

    it('should convert given string-based stream to string stream', () => {
      const str = val('str');

      const result = asString(str);

      expect(result).toBeInstanceOf(StringStream);
      expect(result.getFactory()).toBe(str.getFactory());
    });
  });

  describe('asNumber()', () => {

    it('should convert given number-based stream to number stream', () => {
      const num = val(10);

      const result = asNumber(num);

      expect(result).toBeInstanceOf(NumberStream);
      expect(result.getFactory()).toBe(num.getFactory());
    });
  });
});
