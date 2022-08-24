import { OptionsWrapper } from '../../src/option/options-wrapper';

describe('OptionsWrapper', () => {

  describe('.ignoreErrors()', () => {

    const cases = [
      [null, true],
      [undefined, true],
      [{}, true],
      [{ ignoreErrors: null }, true],
      [{ ignoreErrors: 0 }, true],
      [{ ignoreErrors: true }, true],
      [{ ignoreErrors: false }, false],
    ];
    test.each(cases)('should wrap the given options and return correct value of "ignoreErrors" option for: %p', (options: any, ignoreErrors: boolean) => {
      const wrapper = new OptionsWrapper(options);
      expect(wrapper.ignoreErrors()).toBe(ignoreErrors);
    });
  });
});
