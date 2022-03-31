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

  describe('.getDefaults()', () => {

    describe('.date', () => {

      const fn = () => '';

      const cases = [
        [null, null],
        [undefined, null],
        [{}, null],
        [{ defaults: { } }, null],
        [{ defaults: { date: '' } }, null],
        [{ defaults: { date: ' ' } }, null],
        [{ defaults: { date: 'DATE' } }, 'DATE'],
        [{ defaults: { date: fn } }, fn],
      ];
      test.each(cases)('should wrap the given options and return correct value of "defaults.date" option for: %p', (options: any, date: any) => {
        const wrapper = new OptionsWrapper(options);
        expect(wrapper.getDefaultFor('date')).toBe(date);
      });
    });
  });
});
