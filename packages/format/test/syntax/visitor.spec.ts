import { FormatterLexer } from '../../src/syntax/lexer';
import { FormatterParser } from '../../src/syntax/parser';
import { createFormatterVisitor } from '../../src/syntax/visitor';
import { SyntaxDefinition } from '../../src/syntax/types/syntax-definition';

describe('FormatterVisitor', () => {

  const lexer = FormatterLexer;
  const parser = new FormatterParser();
  const visitor = createFormatterVisitor(parser);

  beforeEach(() => {
    parser.reset();
  });

  describe('.visit()', () => {

    const cases = [
      ['path', { path: 'path', pipes: [] }],
      ['user.detail.balances.0.currency', {
        path: 'user.detail.balances.0.currency',
        pipes: [],
      }],
      ['user.name:padStart(4)', {
        path: 'user.name',
        pipes: [{ name: 'padStart', parameters: [4] }],
      }],
      ['user.name:pad("s")|f([])', {
        path: 'user.name',
        pipes: [{ name: 'pad', parameters: ['s'] }, { name: 'f', parameters: [[]] }],
      }],
      [':format("yyyy-MM-dd HH:mm:ss", {"id": 1})', {
        pipes: [{ name: 'format', parameters: ['yyyy-MM-dd HH:mm:ss', { id: 1}] }],
      }],
    ];
    test.each(cases)('that parse expression successfully: %p', (input: string, output: any) => {
      const lexingResult = lexer.tokenize(input);
      parser.input = lexingResult.tokens;
      const cst = parser.expression();

      expect(lexingResult.errors.length + parser.errors.length).toBe(0);

      const result = visitor.visit(cst) as SyntaxDefinition;

      expect(result).toStrictEqual(output);
    });
  });
});
