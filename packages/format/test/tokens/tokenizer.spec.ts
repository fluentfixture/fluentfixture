import { tokenize } from '../../src/tokens/tokenizer';

describe('tokenizer', () => {

  describe('tokenize()', () => {

    const expressions = [
      ['{}', '', null, [], true],
      ['{|}', '', null, [], true],
      ['{:}', '', '', [], true],
      ['{:|}', '', '', [], true],
      ['{:|||}', '', '', [], true],
      ['{|:}', '', null, [':'], true],
      ['{|:|}', '', null, [':'], true],
      ['{ token }', 'token', null, [], true],
      ['{:def }', '', 'def', [], true],
      ['{token:def }', 'token', 'def', [], true],
      ['{|op }', '', null, ['op'], true],
      ['{:def|op }', '', 'def', ['op'], true],
      ['{token:def|op }', 'token', 'def', ['op'], true],
      ['{token:def|op1|op2 }', 'token', 'def', ['op1', 'op2'], true],
      ['{token:def|op1|op2| }', 'token', 'def', ['op1', 'op2'], true],
      ['{token|op:def }', 'token', null, ['op:def'], true],
      ['{token:def| }', 'token', 'def', [], true],
      ['{token:| }', 'token', '', [], true],
      ['{token|op: }', 'token', null, ['op:'], true],
      ['', '', null, [], false],
      [' ', ' ', null, [], false],
      [' . ', ' . ', null, [], false],
      [' {} ', ' {} ', null, [], false],
      ['{', '{', null, [], false],
      ['}', '}', null, [], false],
    ];

    test.each(expressions)('should parse expression: %p', (token: any, expression: string, def: string, transformers: string[], dynamic: boolean) => {
        const metadata = tokenize(token);

        expect(metadata.body).toBe(expression);
        expect(metadata.fallback).toBe(def);
        expect(metadata.transformers).toStrictEqual(transformers)
        expect(metadata.dynamic).toBe(dynamic);
      }
    );
  });
});
