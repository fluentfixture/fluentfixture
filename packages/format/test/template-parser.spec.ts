import { parseTemplate } from '../src/template-parser';
import { createModifierFactory } from '../src/modifiers/modifier-factory';

describe('template-parser', () => {

  const modifiers = createModifierFactory();

  describe('parseTemplate()', () => {

    describe('empty template checks', () => {

      it('should return empty array when template is null or empty', () => {
        expect(parseTemplate(null, modifiers)).toHaveLength(0);
        expect(parseTemplate(undefined, modifiers)).toHaveLength(0);
        expect(parseTemplate('', modifiers)).toHaveLength(0);
      });
    });

    describe('expression evaluator length checks', () => {

      const cases = [
        ['', 0],
        [' ', 1],
        ['lorem ipsum dolor sit amet', 1],
        ['{lorem} ipsum dolor sit amet', 2],
        [' {lorem} ipsum dolor sit amet', 3],
        ['lorem ipsum dolor sit {amet}', 2],
        ['lorem ipsum dolor sit {amet}.', 3],
        ['{lorem} ipsum dolor sit {amet}', 3],
        [' {lorem} ipsum dolor sit {amet}!', 5]
      ];

      test.each(cases)('should parse template:%p, returns array with %p items', (template, length) => {
          expect(parseTemplate(template as string, modifiers)).toHaveLength(length as number);
        }
      );
    });
  });
});
