import { Engine } from '../../../src/formatter/syntax/engine';
import { SyntaxDefinition } from '../../../src/formatter/syntax/types/syntax-definition';

describe('Engine', () => {

  const engine = Engine.instance();

  describe('.parse()', () => {

    const validCases: Array<[string, SyntaxDefinition]> = [
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
    test.each(validCases)('that parse expression successfully: %p', (input: string, output: any) => {
      const result = engine.parse(input);

      expect(result).toStrictEqual(output);
    });

    const invalidCases = [
      'balance.',             // invalid path
      'balance..amount',      // invalid path
      'format:()',            // missing pipe name
      'format(:()',           // missing left parenthesis
      'format):()',           // missing right parenthesis
      ':format(yyyy)',        // invalid parameter
      'format("yyyy"',        // missing parenthesis
      'path:format("yyyy")|', // invalid pipes
    ];
    test.each(invalidCases)('that returns error when input is invalid: %p', (input: string) => {
      const thrown = () => engine.parse(input);

      expect(thrown).toThrowError();
    });
  });
});
