import { extendOptions } from '../../src/parsers/options';
import { Options } from '../../src/parsers/types/options';

describe('options', () => {

  describe('extendOptions()', () => {

    const options = [
      [null, { ignoreErrors: true }],
      [undefined, { ignoreErrors: true }],
      [{}, { ignoreErrors: true }],
    ];
    test.each(options)('should extend the options: %p', (option: any, output: Options) => {
      expect(extendOptions(option)).toStrictEqual(output);
    });
  });
});
