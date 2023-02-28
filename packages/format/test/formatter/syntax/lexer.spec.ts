import { FormatterLexer } from '../../../src/formatter/syntax/lexer';

describe('FormatterLexer', () => {

  const lexer = FormatterLexer;

  describe('.tokenize()', () => {

    const validCases = [
      ':fn(true, false, null, [1, "str"], {})',           // plain arguments
      'balance.amount.0',                                 // paths
      'balance.amount.name:format("yyyy-mm-dd HH:mm:ss")',// paths and pipes
      ':format()|now(12, null)',                          // only pipes
      'balance.amount.getCurrency(2):trimLeft()'          // function invoke
    ];
    test.each(validCases)('that tokenize input successfully: %p', (input) => {
      const result = lexer.tokenize(input);
      expect(result.errors).toHaveLength(0);
    });

    const invalidCases = [
      ':fn(TRUE, false, null, [1, "str"], {})',             // invalid boolean arguments
      'balance.amount.',                                    // invalid path
      'balance.amount.name:"yyyy-mm-dd HH:mm:ss"',          // missing function
      'balance.amount(:trimLeft()',                         // invalid function
      'balance.amount):trimLeft()',                         // invalid function
    ];
    test.each(invalidCases)('that returns error when input is invalid: %p', (input) => {
      const result = lexer.tokenize(input);
      expect(result.errors).not.toHaveLength(0);
    });
  });
});
