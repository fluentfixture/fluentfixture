import { normalize } from '../../src/parsers/options';
import { Options } from '../../src/parsers/types/options';

describe('options', () => {

  describe('normalize()', () => {

    const options = [
      [null, { ignoreErrors: true }],
      [undefined, { ignoreErrors: true }],
      [{}, { ignoreErrors: true }],
      [{ ignoreErrors: null }, { ignoreErrors: true }],
      [{ ignoreErrors: 0 }, { ignoreErrors: true }],
    ];
    test.each(options)('should extend the options: %p', (option: any, output: Options) => {
      expect(normalize(option)).toStrictEqual(output);
    });
  });
});
