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

  describe('.getSerializers()', () => {

    const fn = () => '';

    describe('.null', () => {

      const cases = [
        [null, null],
        [undefined, null],
        [{}, null],
        [{ serializers: { } }, null],
        [{ serializers: { null: '' } }, null],
        [{ serializers: { null: ' ' } }, null],
        [{ serializers: { null: 'PIPE' } }, 'PIPE'],
        [{ serializers: { null: fn } }, fn],
      ];
      test.each(cases)('should wrap the given options and return correct value of "serializers.null" option for: %p', (options: any, val: any) => {
        const wrapper = new OptionsWrapper(options);
        expect(wrapper.getSerializers().null).toBe(val);
      });
    });

    describe('.undefined', () => {

      const cases = [
        [null, null],
        [undefined, null],
        [{}, null],
        [{ serializers: { } }, null],
        [{ serializers: { undefined: '' } }, null],
        [{ serializers: { undefined: ' ' } }, null],
        [{ serializers: { undefined: 'PIPE' } }, 'PIPE'],
        [{ serializers: { undefined: fn } }, fn],
      ];
      test.each(cases)('should wrap the given options and return correct value of "serializers.undefined" option for: %p', (options: any, val: any) => {
        const wrapper = new OptionsWrapper(options);
        expect(wrapper.getSerializers().undefined).toBe(val);
      });
    });

    describe('.string', () => {

      const cases = [
        [null, null],
        [undefined, null],
        [{}, null],
        [{ serializers: { } }, null],
        [{ serializers: { string: '' } }, null],
        [{ serializers: { string: ' ' } }, null],
        [{ serializers: { string: 'PIPE' } }, 'PIPE'],
        [{ serializers: { string: fn } }, fn],
      ];
      test.each(cases)('should wrap the given options and return correct value of "serializers.string" option for: %p', (options: any, val: any) => {
        const wrapper = new OptionsWrapper(options);
        expect(wrapper.getSerializers().string).toBe(val);
      });
    });

    describe('.number', () => {

      const cases = [
        [null, null],
        [undefined, null],
        [{}, null],
        [{ serializers: { } }, null],
        [{ serializers: { number: '' } }, null],
        [{ serializers: { number: ' ' } }, null],
        [{ serializers: { number: 'PIPE' } }, 'PIPE'],
        [{ serializers: { number: fn } }, fn],
      ];
      test.each(cases)('should wrap the given options and return correct value of "serializers.number" option for: %p', (options: any, val: any) => {
        const wrapper = new OptionsWrapper(options);
        expect(wrapper.getSerializers().number).toBe(val);
      });
    });

    describe('.boolean', () => {

      const cases = [
        [null, null],
        [undefined, null],
        [{}, null],
        [{ serializers: { } }, null],
        [{ serializers: { boolean: '' } }, null],
        [{ serializers: { boolean: ' ' } }, null],
        [{ serializers: { boolean: 'PIPE' } }, 'PIPE'],
        [{ serializers: { boolean: fn } }, fn],
      ];
      test.each(cases)('should wrap the given options and return correct value of "serializers.boolean" option for: %p', (options: any, val: any) => {
        const wrapper = new OptionsWrapper(options);
        expect(wrapper.getSerializers().boolean).toBe(val);
      });
    });

    describe('.date', () => {

      const cases = [
        [null, null],
        [undefined, null],
        [{}, null],
        [{ serializers: { } }, null],
        [{ serializers: { date: '' } }, null],
        [{ serializers: { date: ' ' } }, null],
        [{ serializers: { date: 'PIPE' } }, 'PIPE'],
        [{ serializers: { date: fn } }, fn],
      ];
      test.each(cases)('should wrap the given options and return correct value of "serializers.date" option for: %p', (options: any, val: any) => {
        const wrapper = new OptionsWrapper(options);
        expect(wrapper.getSerializers().date).toBe(val);
      });
    });

    describe('.symbol', () => {

      const cases = [
        [null, null],
        [undefined, null],
        [{}, null],
        [{ serializers: { } }, null],
        [{ serializers: { symbol: '' } }, null],
        [{ serializers: { symbol: ' ' } }, null],
        [{ serializers: { symbol: 'PIPE' } }, 'PIPE'],
        [{ serializers: { symbol: fn } }, fn],
      ];
      test.each(cases)('should wrap the given options and return correct value of "serializers.symbol" option for: %p', (options: any, val: any) => {
        const wrapper = new OptionsWrapper(options);
        expect(wrapper.getSerializers().symbol).toBe(val);
      });
    });

    describe('.array', () => {

      const cases = [
        [null, null],
        [undefined, null],
        [{}, null],
        [{ serializers: { } }, null],
        [{ serializers: { array: '' } }, null],
        [{ serializers: { array: ' ' } }, null],
        [{ serializers: { array: 'PIPE' } }, 'PIPE'],
        [{ serializers: { array: fn } }, fn],
      ];
      test.each(cases)('should wrap the given options and return correct value of "serializers.array" option for: %p', (options: any, val: any) => {
        const wrapper = new OptionsWrapper(options);
        expect(wrapper.getSerializers().array).toBe(val);
      });
    });

    describe('.function', () => {

      const cases = [
        [null, null],
        [undefined, null],
        [{}, null],
        [{ serializers: { } }, null],
        [{ serializers: { function: '' } }, null],
        [{ serializers: { function: ' ' } }, null],
        [{ serializers: { function: 'PIPE' } }, 'PIPE'],
        [{ serializers: { function: fn } }, fn],
      ];
      test.each(cases)('should wrap the given options and return correct value of "serializers.function" option for: %p', (options: any, val: any) => {
        const wrapper = new OptionsWrapper(options);
        expect(wrapper.getSerializers().function).toBe(val);
      });
    });

    describe('.object', () => {

      const cases = [
        [null, null],
        [undefined, null],
        [{}, null],
        [{ serializers: { } }, null],
        [{ serializers: { object: '' } }, null],
        [{ serializers: { object: ' ' } }, null],
        [{ serializers: { object: 'PIPE' } }, 'PIPE'],
        [{ serializers: { object: fn } }, fn],
      ];
      test.each(cases)('should wrap the given options and return correct value of "serializers.object" option for: %p', (options: any, val: any) => {
        const wrapper = new OptionsWrapper(options);
        expect(wrapper.getSerializers().object).toBe(val);
      });
    });

    describe('.unknown', () => {

      const cases = [
        [null, null],
        [undefined, null],
        [{}, null],
        [{ serializers: { } }, null],
        [{ serializers: { unknown: '' } }, null],
        [{ serializers: { unknown: ' ' } }, null],
        [{ serializers: { unknown: 'PIPE' } }, 'PIPE'],
        [{ serializers: { unknown: fn } }, fn],
      ];
      test.each(cases)('should wrap the given options and return correct value of "serializers.unknown" option for: %p', (options: any, val: any) => {
        const wrapper = new OptionsWrapper(options);
        expect(wrapper.getSerializers().unknown).toBe(val);
      });
    });
  });
});
