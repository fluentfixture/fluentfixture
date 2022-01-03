import { parseTokenMetadata } from '../../src/tokens/metadata-parser';

describe('metadata-parser', () => {

  describe('parseTokenMetadata()', () => {

    const cases = [
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

    test.each(cases)('should parse expression: %p', (token, expression, def, modifiers, dynamic) => {
        const metadata = parseTokenMetadata(token as string);

        expect(metadata.expression).toBe(expression);
        expect(metadata.fallback).toBe(def);
        expect(metadata.modifiers).toStrictEqual(modifiers)
        expect(metadata.dynamic).toBe(dynamic);
      }
    );
  });
});
