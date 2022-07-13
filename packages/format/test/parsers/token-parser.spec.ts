import { TokenParser } from '../../src/parsers/token-parser';

describe('TokenParser', () => {

  const tokenParser = new TokenParser();

  describe('.parse()', () => {

    const tokens = [
      ['${}', undefined, undefined, []],
      ['${|}', undefined, undefined, []],
      ['${:}', undefined, '', []],
      ['${:|}', undefined, '', []],
      ['${:|||}', undefined, '', []],
      ['${|:}', undefined, undefined, [':']],
      ['${|:|}', undefined, undefined, [':']],
      ['${ token }', 'token', undefined, []],
      ['${:def }', undefined, 'def', []],
      ['${token:def }', 'token', 'def', []],
      ['${|op }', undefined, undefined, ['op']],
      ['${:def|op }', undefined, 'def', ['op']],
      ['${token:def|op }', 'token', 'def', ['op']],
      ['${token:def|op1|op2 }', 'token', 'def', ['op1', 'op2']],
      ['${token:def|op1|op2| }', 'token', 'def', ['op1', 'op2']],
      ['${token|op:def }', 'token', undefined, ['op:def']],
      ['${token:def| }', 'token', 'def', []],
      ['${token:| }', 'token', '', []],
      ['${token|op: }', 'token', undefined, ['op:']],
    ];
    test.each(tokens)('should parse expression into token metadata: %p', (expression: string, value: string, fallback: string, pipes: string[]) => {
      const metadata = tokenParser.parse(expression);

      expect(metadata.query).toBe(value);
      expect(metadata.fallback).toBe(fallback);
      expect(metadata.pipes).toStrictEqual(pipes);
    });
  });
});
