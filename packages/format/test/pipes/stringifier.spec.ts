import { Stringifier } from '../../src/pipes/stringifier';

describe('Stringifier', () => {

  describe('.handle()', () => {

    const inputs = [
      ['', ''],
      [undefined, ''],
      [null, ''],
      [true, 'true'],
      [1, '1'],
    ];
    test.each(inputs)('should covert the given input into string: %p', (input: any, output: string) => {
      const pipe = new Stringifier();

      const result = pipe.handle(input);

      expect(result).toBe(output);
    });
  });
});
