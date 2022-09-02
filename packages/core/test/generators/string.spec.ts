import { str, hex, octal, numeric, alphanumeric, alphabetic, text, binary } from '../../src/generators/generators';
import { StringStream } from '../../src/streams/stream-loader';
import { StringFactory } from '../../src/factories/string-factory';
import { DEFAULT_STRING_LENGTH } from '../../src/constants/limits';
import { ValueAdapter } from '../../src/factories/adapters/value-adapter';

describe('string', () => {

  describe('text()', () => {

    it('should create a string stream with constant text', () => {
      const str = 'str';

      const result = text(str);

      const valueAdapter = result.getFactory() as ValueAdapter;

      expect(result).toBeInstanceOf(StringStream);
      expect(valueAdapter).toBeInstanceOf(ValueAdapter);
      expect(valueAdapter.getValue()).toBe(str);
    });
  });

  describe('str()', () => {

    it('should create a string stream with alphanumeric charset with given length', () => {
      const length = 5;
      const charset = 'charset';

      const result = str(charset, length);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getCharset()).toBe(charset);
      expect(stringFactory.getLength()).toBe(length);
    });

    it('should use default length when length is not provided', () => {
      const charset = 'charset';
      const result = str(charset);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getCharset()).toBe(charset);
      expect(stringFactory.getLength()).toBe(DEFAULT_STRING_LENGTH);
    });
  });

  describe('hex()', () => {

    it('should create a string stream with hex charset with given length', () => {
      const length = 5;

      const result = hex(length);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getCharset()).toBe('hex');
      expect(stringFactory.getLength()).toBe(length);
    });

    it('should use default length when length is not provided', () => {
      const result = hex();

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getCharset()).toBe('hex');
      expect(stringFactory.getLength()).toBe(DEFAULT_STRING_LENGTH);
    });
  });

  describe('binary()', () => {

    it('should create a string stream with binary charset with given length', () => {
      const length = 5;

      const result = binary(length);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getCharset()).toBe('binary');
      expect(stringFactory.getLength()).toBe(length);
    });

    it('should use default length when length is not provided', () => {
      const result = binary();

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getCharset()).toBe('binary');
      expect(stringFactory.getLength()).toBe(DEFAULT_STRING_LENGTH);
    });
  });

  describe('octal()', () => {

    it('should create a string stream with octal charset with given length', () => {
      const length = 5;

      const result = octal(length);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getCharset()).toBe('octal');
      expect(stringFactory.getLength()).toBe(length);
    });

    it('should use default length when length is not provided', () => {
      const result = octal();

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getCharset()).toBe('octal');
      expect(stringFactory.getLength()).toBe(DEFAULT_STRING_LENGTH);
    });
  });

  describe('numeric()', () => {

    it('should create a string stream with numeric charset with given length', () => {
      const length = 5;

      const result = numeric(length);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getCharset()).toBe('numeric');
      expect(stringFactory.getLength()).toBe(length);
    });

    it('should use default length when length is not provided', () => {
      const result = numeric();

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getCharset()).toBe('numeric');
      expect(stringFactory.getLength()).toBe(DEFAULT_STRING_LENGTH);
    });
  });

  describe('alphanumeric()', () => {

    it('should create a string stream with alphanumeric charset with given length', () => {
      const length = 5;

      const result = alphanumeric(length);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getCharset()).toBe('alphanumeric');
      expect(stringFactory.getLength()).toBe(length);
    });

    it('should use default length when length is not provided', () => {
      const result = alphanumeric();

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getCharset()).toBe('alphanumeric');
      expect(stringFactory.getLength()).toBe(DEFAULT_STRING_LENGTH);
    });
  });

  describe('alphabetic()', () => {

    it('should create a string stream with alphabetic charset with given length', () => {
      const length = 5;

      const result = alphabetic(length);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getCharset()).toBe('alphabetic');
      expect(stringFactory.getLength()).toBe(length);
    });

    it('should use default length when length is not provided', () => {
      const result = alphabetic();

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getCharset()).toBe('alphabetic');
      expect(stringFactory.getLength()).toBe(DEFAULT_STRING_LENGTH);
    });
  });
});
