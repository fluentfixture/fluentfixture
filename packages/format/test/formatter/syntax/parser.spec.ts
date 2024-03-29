import { FormatterLexer } from '../../../src/formatter/syntax/lexer';
import { FormatterParser } from '../../../src/formatter/syntax/parser';

describe('FormatterParser', () => {

  const lexer = FormatterLexer;
  const parser = new FormatterParser();

  beforeEach(() => {
    parser.reset();
  });

  describe('.expression()', () => {

    const validCases = [
      'balance.currency',                   // only path
      'balance.currency.0.id',              // only path with index
      'balance.currency.0.id:def()',        // path and parameterless function
      'balance.currency.0.id:def(true)',    // path and function
      ':def(true)',                         // no path and function
      'key:ob({"id": 12})|padEnd(2)',       // path and two functions
      'balance.currency.summary(3)',        // invokable path
      'balance.currency.summary(3):trim()', // invokable path and pipe
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
      ':2string(true)',                   // invalid function name
      'key:format("yyyy")||padEnd(2)',    // duplicated pipe
      'balance.currency.summary(',        // missing parenthesis on path
      'balance.currency.summary(3)()',    // multiple function on path
    ];
    test.each(invalidCases)('that returns error when input is invalid: %p', (input) => {
      const lexingResult = lexer.tokenize(input);

      parser.input = lexingResult.tokens;

      parser.expression();

      expect(parser.errors.length + lexingResult.errors.length).not.toBe(0);
    });
  });
});
