import { spy, verify, when } from 'ts-mockito';
import { Random } from '@fluentfixture/shared';
import { NON_INTEGER_DATA_SET, NON_NON_EMPTY_STRING_DATA_SET } from '../data/type-sets';
import { MAX_STRING_LENGTH, MIN_STRING_LENGTH } from '../../src/constants/limits';
import { StringFactory } from '../../src/factories/string-factory';

describe('StringFactory', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (charset)', () => {

      test.each(NON_NON_EMPTY_STRING_DATA_SET)('should throw an error when charset is not a non-empty string, given: %s', (charset: any) => {

        const thrown = () => new StringFactory(charset, 1, 2);

        expect(thrown).toThrow('[StringFactory.constructor(charset, minLength, maxLength)].[charset]: Parameter must be a non-empty string!');
      });
    });

    describe('parameter assertions (minLength)', () => {

      test.each(NON_INTEGER_DATA_SET)('should throw an error when min length is not an integer, given: %s', (minLength: any) => {

        const thrown = () => new StringFactory('hex', minLength, 1);

        expect(thrown).toThrow('[StringFactory.constructor(charset, minLength, maxLength)].[minLength]: Parameter must be an integer!');
      });

      it('should throw an error when min length is less than the minimum string length', () => {

        const thrown = () => new StringFactory('hex', MIN_STRING_LENGTH - 1, 5);

        expect(thrown).toThrow(`[StringFactory.constructor(charset, minLength, maxLength)].[minLength]: Parameter must be between ${MIN_STRING_LENGTH} and ${MAX_STRING_LENGTH}!`);
      });

      it('should throw an error when min length is greater than the maximum string length', () => {

        const thrown = () => new StringFactory('hex', MAX_STRING_LENGTH + 1, 1);

        expect(thrown).toThrow(`[StringFactory.constructor(charset, minLength, maxLength)].[minLength]: Parameter must be between ${MIN_STRING_LENGTH} and ${MAX_STRING_LENGTH}!`);
      });
    });

    describe('parameter assertions (maxLength)', () => {

      test.each(NON_INTEGER_DATA_SET)('should throw an error when max length is not an integer, given: %s', (maxLength: any) => {

        const thrown = () => new StringFactory('hex', 1, maxLength);

        expect(thrown).toThrow('[StringFactory.constructor(charset, minLength, maxLength)].[maxLength]: Parameter must be an integer!');
      });

      it('should throw an error when max length is less than the minimum string length', () => {

        const thrown = () => new StringFactory('hex', 1, MIN_STRING_LENGTH - 1);

        expect(thrown).toThrow(`[StringFactory.constructor(charset, minLength, maxLength)].[maxLength]: Parameter must be between ${MIN_STRING_LENGTH} and ${MAX_STRING_LENGTH}!`);
      });

      it('should throw an error when max length is greater than the maximum string length', () => {

        const thrown = () => new StringFactory('hex', 1, MAX_STRING_LENGTH + 1);

        expect(thrown).toThrow(`[StringFactory.constructor(charset, minLength, maxLength)].[maxLength]: Parameter must be between ${MIN_STRING_LENGTH} and ${MAX_STRING_LENGTH}!`);
      });
    });
  });

  describe('.single()', () => {

    it('should create a string by using engine', () => {
      const spyEngine = spy(Random);
      const minLength = 5;
      const maxLength = 10;
      const charset = 'hex';
      const out = 'ABCDE';
      const factory = new StringFactory(charset, minLength, maxLength);

      when(spyEngine.string(charset, minLength, maxLength)).thenReturn(out);

      const result = factory.single();

      expect(result).toBe(out);
      verify(spyEngine.string(charset, minLength, maxLength)).once();
    });
  });
});
