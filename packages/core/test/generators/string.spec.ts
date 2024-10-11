import { str, hex, octal, numeric, alphanumeric, alphabetic, text, binary } from '../../src/generators/string';
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

    it('should create a string stream and use default length when length is not provided', () => {
      const pool = 'chars';
      const result = str(pool);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe(pool);
      expect(stringFactory.getMinLength()).toBe(DEFAULT_STRING_LENGTH);
      expect(stringFactory.getMaxLength()).toBe(DEFAULT_STRING_LENGTH);
    });

    it('should create a string stream and use the given min length', () => {
      const length = 5;
      const pool = 'chars';

      const result = str(pool, length);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe(pool);
      expect(stringFactory.getMinLength()).toBe(length);
      expect(stringFactory.getMaxLength()).toBe(length);
    });

    it('should create a string stream and use the given min length and max length', () => {
      const minLength = 5;
      const maxLength = 10;
      const pool = 'chars';

      const result = str(pool, minLength, maxLength);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe(pool);
      expect(stringFactory.getMinLength()).toBe(minLength);
      expect(stringFactory.getMaxLength()).toBe(maxLength);
    });
  });

  describe('hex()', () => {

    it('should create a hex string stream and use default length when length is not provided', () => {
      const result = hex();

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe('abcdef0123456789');
      expect(stringFactory.getMinLength()).toBe(DEFAULT_STRING_LENGTH);
      expect(stringFactory.getMaxLength()).toBe(DEFAULT_STRING_LENGTH);
    });

    it('should create a hex string stream and use the given min length', () => {
      const length = 5;

      const result = hex(length);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe('abcdef0123456789');
      expect(stringFactory.getMinLength()).toBe(length);
      expect(stringFactory.getMaxLength()).toBe(length);
    });

    it('should create a hex string stream and use the given min length and max length', () => {
      const minLength = 5;
      const maxLength = 10;

      const result = hex(minLength, maxLength);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe('abcdef0123456789');
      expect(stringFactory.getMinLength()).toBe(minLength);
      expect(stringFactory.getMaxLength()).toBe(maxLength);
    });
  });

  describe('octal()', () => {

    it('should create an octal string stream and use default length when length is not provided', () => {
      const result = octal();

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe('01234567');
      expect(stringFactory.getMinLength()).toBe(DEFAULT_STRING_LENGTH);
      expect(stringFactory.getMaxLength()).toBe(DEFAULT_STRING_LENGTH);
    });

    it('should create an octal string stream and use the given min length', () => {
      const length = 5;

      const result = octal(length);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe('01234567');
      expect(stringFactory.getMinLength()).toBe(length);
      expect(stringFactory.getMaxLength()).toBe(length);
    });

    it('should create an octal string stream and use the given min length and max length', () => {
      const minLength = 5;
      const maxLength = 10;

      const result = octal(minLength, maxLength);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe('01234567');
      expect(stringFactory.getMinLength()).toBe(minLength);
      expect(stringFactory.getMaxLength()).toBe(maxLength);
    });
  });

  describe('binary()', () => {

    it('should create a binary string stream and use default length when length is not provided', () => {
      const result = binary();

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe('01');
      expect(stringFactory.getMinLength()).toBe(DEFAULT_STRING_LENGTH);
      expect(stringFactory.getMaxLength()).toBe(DEFAULT_STRING_LENGTH);
    });

    it('should create a binary string stream and use the given min length', () => {
      const length = 5;

      const result = binary(length);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe('01');
      expect(stringFactory.getMinLength()).toBe(length);
      expect(stringFactory.getMaxLength()).toBe(length);
    });

    it('should create a binary string stream and use the given min length and max length', () => {
      const minLength = 5;
      const maxLength = 10;

      const result = binary(minLength, maxLength);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe('01');
      expect(stringFactory.getMinLength()).toBe(minLength);
      expect(stringFactory.getMaxLength()).toBe(maxLength);
    });
  });

  describe('numeric()', () => {

    it('should create a numeric string stream and use default length when length is not provided', () => {
      const result = numeric();

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe('0123456789');
      expect(stringFactory.getMinLength()).toBe(DEFAULT_STRING_LENGTH);
      expect(stringFactory.getMaxLength()).toBe(DEFAULT_STRING_LENGTH);
    });

    it('should create a numeric string stream and use the given min length', () => {
      const length = 5;

      const result = numeric(length);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe('0123456789');
      expect(stringFactory.getMinLength()).toBe(length);
      expect(stringFactory.getMaxLength()).toBe(length);
    });

    it('should create a numeric string stream and use the given min length and max length', () => {
      const minLength = 5;
      const maxLength = 10;

      const result = numeric(minLength, maxLength);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe('0123456789');
      expect(stringFactory.getMinLength()).toBe(minLength);
      expect(stringFactory.getMaxLength()).toBe(maxLength);
    });
  });

  describe('alphabetic()', () => {

    it('should create an alphabetic string stream and use default length when length is not provided', () => {
      const result = alphabetic();

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
      expect(stringFactory.getMinLength()).toBe(DEFAULT_STRING_LENGTH);
      expect(stringFactory.getMaxLength()).toBe(DEFAULT_STRING_LENGTH);
    });

    it('should create an alphabetic string stream and use the given min length', () => {
      const length = 5;

      const result = alphabetic(length);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
      expect(stringFactory.getMinLength()).toBe(length);
      expect(stringFactory.getMaxLength()).toBe(length);
    });

    it('should create an alphabetic string stream and use the given min length and max length', () => {
      const minLength = 5;
      const maxLength = 10;

      const result = alphabetic(minLength, maxLength);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
      expect(stringFactory.getMinLength()).toBe(minLength);
      expect(stringFactory.getMaxLength()).toBe(maxLength);
    });
  });

  describe('alphanumeric()', () => {

    it('should create an alphanumeric string stream and use default length when length is not provided', () => {
      const result = alphanumeric();

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
      expect(stringFactory.getMinLength()).toBe(DEFAULT_STRING_LENGTH);
      expect(stringFactory.getMaxLength()).toBe(DEFAULT_STRING_LENGTH);
    });

    it('should create an alphanumeric string stream and use the given min length', () => {
      const length = 5;

      const result = alphanumeric(length);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
      expect(stringFactory.getMinLength()).toBe(length);
      expect(stringFactory.getMaxLength()).toBe(length);
    });

    it('should create an alphanumeric string stream and use the given min length and max length', () => {
      const minLength = 5;
      const maxLength = 10;

      const result = alphanumeric(minLength, maxLength);

      const stringFactory = result.getFactory() as StringFactory;

      expect(result).toBeInstanceOf(StringStream);
      expect(stringFactory).toBeInstanceOf(StringFactory);
      expect(stringFactory.getPool()).toBe('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
      expect(stringFactory.getMinLength()).toBe(minLength);
      expect(stringFactory.getMaxLength()).toBe(maxLength);
    });
  });
});
