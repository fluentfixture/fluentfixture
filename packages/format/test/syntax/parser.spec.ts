import { FormatterLexer } from '../../src/syntax/lexer';
import { FormatterParser } from '../../src/syntax/parser';

describe('FormatterParser', () => {

  const lexer = FormatterLexer;
  const parser = new FormatterParser();

  beforeEach(() => {
    parser.reset();
  });

  describe('.expression()', () => {

    const validCases = [
      'balance.currency',                // only path
      'balance.currency.0.id',           // only path with index
      'balance.currency.0.id:def()',     // path and parameterless function
      'balance.currency.0.id:def(true)', // path and function
      ':def(true)',                      // no path and function
      'key:ob({"id": 12})|padEnd(2)'     // path and two functions
    ];
    test.each(validCases)('that parse expression successfully: %p', (input) => {
      const lexingResult = lexer.tokenize(input);

      parser.input = lexingResult.tokens;

      const cst = parser.expression();

      expect(cst).toBeDefined();
      expect(parser.errors.length + lexingResult.errors.length).toBe(0);
    });

    const invalidCases = [
      'balance.currency.',                // invalid path
      'balance.currency..id',             // invalid path
      'balance.currency.0.id:def',        // missing parenthesis
      'balance.currency.0.id:def(',       // missing parenthesis
      'balance.currency.0.id:def)',       // missing parenthesis
      'def(true)',                        // missing colon
      ':2string(true)',                   // invalid function name
      'key:format("yyyy")||padEnd(2)'     // duplicated pipe
    ];
    test.each(invalidCases)('that returns error when input is invalid: %p', (input) => {
      const lexingResult = lexer.tokenize(input);

      parser.input = lexingResult.tokens;

      parser.expression();

      expect(parser.errors.length + lexingResult.errors.length).not.toBe(0);
    });
  });
});
