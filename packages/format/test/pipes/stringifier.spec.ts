import { Stringifier } from '../../src/pipes/stringifier';

describe('Stringifier', () => {

  const stringifier = Stringifier.instance();

  describe('.handle()', () => {

    const cases = [
      [null, ''],
      [undefined, ''],
      [1, '1'],
      ['', ''],
      [true, 'true'],
      [Symbol.for('symbol'), 'Symbol(symbol)'],
      [() => true, '() => true'],
      [[1,2], '1,2'],
      [{}, '[object Object]'],
      [/[A-Z]/g, '/[A-Z]/g'],
    ];
    test.each(cases)('should convert input to string: %p', (input: unknown, output: string) => {
      const result = stringifier.handle(input);

      expect(result).toBe(output);
    });
  });
});
