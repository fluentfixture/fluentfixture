import { spy, verify, when } from 'ts-mockito';
import { NON_INTEGER_DATA_SET, NON_NON_EMPTY_STRING_DATA_SET } from '../data/type-sets';
import { MAX_STRING_LENGTH, MIN_STRING_LENGTH } from '../../src/constants/limits';
import { Random } from '../../src/engine/random';
import { StringFactory } from '../../src/factories/string-factory';

describe('StringFactory', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (charset)', () => {

      test.each(NON_NON_EMPTY_STRING_DATA_SET)('should throw an error when charset is not a non-empty string, given: %s', (charset: any) => {

        const thrown = () => new StringFactory(charset, 1);

        expect(thrown).toThrow('[StringFactory.constructor(charset, length)].[charset]: Parameter must be a non-empty string!');
      });
    });

    describe('parameter assertions (length)', () => {

      test.each(NON_INTEGER_DATA_SET)('should throw an error when length is not an integer, given: %s', (length: any) => {

        const thrown = () => new StringFactory('hex', length);

        expect(thrown).toThrow('[StringFactory.constructor(charset, length)].[length]: Parameter must be an integer!');
      });

      it('should throw an error when length is less than the minimum string length', () => {

        const thrown = () => new StringFactory('hex', MIN_STRING_LENGTH - 1);

        expect(thrown).toThrow(`[StringFactory.constructor(charset, length)].[length]: Parameter must be between ${MIN_STRING_LENGTH} and ${MAX_STRING_LENGTH}!`);
      });

      it('should throw an error when length is greater than the maximum string length', () => {

        const thrown = () => new StringFactory('hex', MAX_STRING_LENGTH + 1);

        expect(thrown).toThrow(`[StringFactory.constructor(charset, length)].[length]: Parameter must be between ${MIN_STRING_LENGTH} and ${MAX_STRING_LENGTH}!`);
      });
    });
  });

  describe('.single()', () => {

    it('should create a string by using engine', () => {
      const spyEngine = spy(Random);
      const length = 5;
      const charset = 'hex';
      const out = 'ABCDE';
      const factory = new StringFactory(charset, length);

      when(spyEngine.string(charset, length)).thenReturn(out);

      const result = factory.single();

      expect(result).toBe(out);
      verify(spyEngine.string(charset, length)).once();
    });
  });
});
