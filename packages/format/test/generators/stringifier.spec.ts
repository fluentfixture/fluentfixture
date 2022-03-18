import { Stringifier } from '../../src/generators/stringifier';

describe('Stringifier', () => {

  describe('.process()', () => {

    const inputs = [
      ['', ''],
      [undefined, ''],
      [null, ''],
      [true, 'true'],
      [1, '1'],
    ];
    test.each(inputs)('should covert the given input into a string: %p', (input: any, output: string) => {
      const generator = new Stringifier();

      const result = generator.process(input);

      expect(result).toBe(output);
    });
  });
});
