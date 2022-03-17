import { Stringifier } from '../../src/generators/stringifier';

describe('Stringifier', () => {

  describe('.process()', () => {

    const inputs = [
      ['', ''],
      [undefined, ''],
      [null, ''],
      [true, 'true'],
      [1, '1'],
      [new Date(1_647_526_028_815), 'Thu Mar 17 2022 17:07:08 GMT+0300 (GMT+03:00)'],
    ];
    test.each(inputs)('should covert the given input into a string: %p', (input: any, output: string) => {
      const generator = new Stringifier();

      const result = generator.process(input);

      expect(result).toBe(output);
    });
  });
});
