import { val } from '../../src/generators/generators';
import { DateStream, NumberStream, StringStream } from '../../src/streams/stream-loader';
import { asDate, asNumber, asString } from '../../src/generators/converters';

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

  describe('asDate()', () => {

    it('should convert given date-based stream to date stream', () => {
      const date = val(new Date());

      const result = asDate(date);

      expect(result).toBeInstanceOf(DateStream);
      expect(result.getFactory()).toBe(date.getFactory());
    });
  });
});
