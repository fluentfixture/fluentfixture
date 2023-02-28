import { FormatterLexer } from '../../../src/formatter/syntax/lexer';
import { FormatterParser } from '../../../src/formatter/syntax/parser';
import { createFormatterVisitor } from '../../../src/formatter/syntax/visitor';
import { SyntaxDefinition } from '../../../src/formatter/syntax/types/syntax-definition';

describe('FormatterVisitor', () => {

  const lexer = FormatterLexer;
  const parser = new FormatterParser();
  const visitor = createFormatterVisitor(parser);

  beforeEach(() => {
    parser.reset();
  });

  describe('.visit()', () => {

    const cases: Array<[string, SyntaxDefinition]> = [
      ['path', {
        path: {
          type: 'PROPERTY',
          value: 'path',
          parameters: [],
        },
        pipes: [],
      }],
      ['user.detail.balances.0.currency', {
        path: {
          type: 'PROPERTY',
          value: 'user.detail.balances.0.currency',
          parameters: [],
        },
        pipes: [],
      }],
      ['user.name:padStart(4)', {
        path: {
          type: 'PROPERTY',
          value: 'user.name',
          parameters: [],
        },
        pipes: [{ name: 'padStart', parameters: [4] }],
      }],
      ['user.name:pad("s")|f([])', {
        path: {
          type: 'PROPERTY',
          value: 'user.name',
          parameters: [],
        },
        pipes: [{ name: 'pad', parameters: ['s'] }, { name: 'f', parameters: [[]] }],
      }],
      [':format("yyyy-MM-dd HH:mm:ss", {"id": 1})', {
        pipes: [{ name: 'format', parameters: ['yyyy-MM-dd HH:mm:ss', { id: 1 }] }],
      }],
      ['user.summary()', {
        path: {
          type: 'FUNCTION',
          value: 'user.summary',
          parameters: [],
        },
        pipes: [],
      }],
      ['user.summary(true, [])', {
        path: {
          type: 'FUNCTION',
          value: 'user.summary',
          parameters: [true, []],
        },
        pipes: [],
      }],
      ['user.summary(true, []):pad(10)', {
        path: {
          type: 'FUNCTION',
          value: 'user.summary',
          parameters: [true, []],
        },
        pipes: [{ name: 'pad', parameters: [10]}],
      }],
    ];
    test.each(cases)('that parse expression successfully: %p', (input: string, output: SyntaxDefinition) => {
      const lexingResult = lexer.tokenize(input);
      parser.input = lexingResult.tokens;
      const cst = parser.expression();

      expect(lexingResult.errors.length + parser.errors.length).toBe(0);

      const result = visitor.visit(cst) as SyntaxDefinition;

      expect(result).toStrictEqual(output);
    });
  });
});
